import { API_ENDPOINTS } from '../../config/api';

/**
 * Parses API error responses into a standardized format.
 * Tries to extract JSON error details (general message or field-specific errors).
 * Falls back to status text or a default message.
 *
 * @param {Response} response The Fetch API Response object.
 * @param {string} defaultErrorMessage Optional default message if parsing fails.
 * @returns {Promise<{message: string, fieldErrors: object|null}>} An object containing a general error message and potentially an object with field-specific errors.
 */
export async function parseApiErrorResponse(response, defaultErrorMessage) {
    let message = defaultErrorMessage || response.statusText || 'Unknown error';
    let fieldErrors = null;

    try {
        const errorData = await response.clone().json(); // Clone before reading body

        if (errorData) {
            // Case 1: Standard error format { message: "...", errors: { field: ["msg"] } } or just { message: "..." }
            if (errorData.message && typeof errorData.message === 'string') {
                message = errorData.message;
            }

            // Check for field-specific errors (adjust key 'errors' if your API uses a different one)
            if (errorData.errors && typeof errorData.errors === 'object' && Object.keys(errorData.errors).length > 0) {
                 fieldErrors = {};
                 for (const key in errorData.errors) {
                     if (Array.isArray(errorData.errors[key]) && errorData.errors[key].length > 0) {
                         fieldErrors[key] = errorData.errors[key][0]; // Take the first message for the field
                     }
                 }
                 // Optional: If we have field errors, maybe adjust the general message
                 if (!message || message === response.statusText) {
                     message = 'Пожалуйста, проверьте ошибки в полях формы.';
                 }
            }
            // Case 2: Non-standard - root is an object of field errors { field: ["msg"] }
            else if (!errorData.message && typeof errorData === 'object' && Object.keys(errorData).length > 0) {
                fieldErrors = {};
                let hasFieldErrors = false;
                for (const key in errorData) {
                    if (Array.isArray(errorData[key]) && errorData[key].length > 0) {
                        fieldErrors[key] = errorData[key][0];
                        hasFieldErrors = true;
                    }
                }
                if (hasFieldErrors) {
                   message = 'Пожалуйста, проверьте ошибки в полях формы.';
                } else {
                    // If it's an object but not the expected field error format, stringify it?
                    message = JSON.stringify(errorData);
                }
            }
            // Case 3: errorData is just a string message (less common for JSON APIs)
            else if (typeof errorData === 'string') {
                message = errorData;
            }
        }
    } catch (jsonError) {
        // If JSON parsing fails, try reading as text
        try {
            const errorText = await response.text();
            if (errorText) {
                message = errorText;
            }
        } catch (textError) {
            // Keep the original default/statusText message if text reading also fails
        }
    }

    return { message, fieldErrors };
}

/**
 * Applies parsed API errors (from parseApiErrorResponse) to react-hook-form state.
 * 
 * @param {{message: string, fieldErrors: object|null}} parsedError The error object from parseApiErrorResponse.
 * @param {Function} setError The setError function from react-hook-form.
 * @param {Function} setGlobalError Function to set a general error message state (e.g., useState setter).
 * @param {Array<{key: string, config: object}>} currentFields Array of currently active form fields to check against.
 * @param {boolean} isLogin Context whether the error occurred during login or registration (optional, for message customization).
 */
export const applyApiErrorsToForm = (parsedError, setError, setGlobalError, currentFields, isLogin = false) => {
  let finalMessage = parsedError.message;
  const fieldErrors = parsedError.fieldErrors;

  if (fieldErrors) {
    let appliedFieldErrors = false;
    Object.entries(fieldErrors).forEach(([fieldName, message]) => {
      const fieldExists = currentFields.some(({ key }) => key === fieldName);
      if (fieldExists) {
        setError(fieldName, { type: 'server', message });
        appliedFieldErrors = true;
      } else {
        // Append unassociated field errors to the general message
        console.warn(`API error for non-displayed field '${fieldName}': ${message}`);
        finalMessage += ` (${fieldName}: ${message})`; 
      }
    });

    // If field errors were applied and the message is still the generic one, update it.
    if (appliedFieldErrors && (finalMessage === parsedError.message || finalMessage.startsWith('Ошибка'))) {
      finalMessage = 'Пожалуйста, проверьте ошибки в полях формы.';
    }
  }
  
  setGlobalError(finalMessage);
};

// --- New API Call Functions ---

/**
 * Performs the login API call.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} The response data on success.
 * @throws {Response} The Response object on failure.
 */
export const loginUser = async (email, password) => {
  const response = await fetch(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ username: email, password: password }),
    credentials: 'include'
  });

  if (!response.ok) {
    throw response;
  }

  return await response.json();
};

/**
 * Performs the registration API call.
 * @param {object} registrationData - Data containing lastName, firstName, etc.
 * @returns {Promise<object>} The response data on success, or an empty object if response is not JSON.
 * @throws {Response} The Response object on failure (non-2xx status).
 */
export const registerUser = async (registrationData) => {
  const response = await fetch(API_ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(registrationData),
    credentials: 'include'
  });

  if (!response.ok) {
    throw response;
  }

  try {
    const text = await response.text();
    if (text) {
      return JSON.parse(text);
    } else {
      return { success: true };
    }
  } catch (error) {
    console.warn('Registration API returned non-JSON response on success:', error);
    return { success: true };
  }
};

// --- Password Strength Logic ---
export const calculatePasswordStrength = (password) => {
  let score = 0;
  if (!password || password.length < 1) return 0;

  // Criteria
  const lengthCriteria = password.length >= 8; // Min length 8
  const lowerCaseCriteria = /[a-z]/.test(password);
  const upperCaseCriteria = /[A-Z]/.test(password);
  const numberCriteria = /[0-9]/.test(password);
  const specialCharCriteria = /[^a-zA-Z0-9]/.test(password);

  if (lengthCriteria) score++;
  if (lowerCaseCriteria) score++;
  if (upperCaseCriteria) score++;
  if (numberCriteria) score++;
  if (specialCharCriteria) score++;
  
  // Adjust scoring slightly for length
  if (password.length >= 12) score++; 

  // Map score to strength level (0-4)
  if (score <= 1) return 1; // Very Weak / Weak
  if (score === 2) return 2; // Medium
  if (score <= 4) return 3; // Strong
  return 4; // Very Strong
};

export const strengthLevels = [
  { label: '', colorClass: '' }, // Level 0 (or initial)
  { label: 'Слабый', colorClass: 'strength-weak' }, // Level 1
  { label: 'Средний', colorClass: 'strength-medium' }, // Level 2
  { label: 'Хороший', colorClass: 'strength-good' }, // Level 3
  { label: 'Отличный', colorClass: 'strength-strong' } // Level 4
];