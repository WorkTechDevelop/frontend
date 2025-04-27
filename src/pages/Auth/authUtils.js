import { API_ENDPOINTS } from '../../config/api';

export async function parseApiErrorResponse(response, defaultMessage) {
    try {
      const errorData = await response.clone().json();
      if (errorData && errorData.message) {
        return errorData.message;
      }
      if (errorData && typeof errorData === 'object' && !errorData.message) {
          const fieldErrors = {};
          let hasFieldErrors = false;
          for (const key in errorData) {
              if (Array.isArray(errorData[key]) && errorData[key].length > 0) {
                  fieldErrors[key] = errorData[key][0]; 
                  hasFieldErrors = true;
              }
          }
          if (hasFieldErrors) {
              return fieldErrors;
          }
      }
    } catch (jsonError) {
        try {
          const errorText = await response.text();
          if (errorText) return errorText;
        } catch (textError) {
        }
    }
    return defaultMessage || response.statusText || 'Unknown error';
  }

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
  });

  if (!response.ok) {
    throw response; // Throw Response object for detailed error handling
  }

  return await response.json(); // Return parsed data on success
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
  });

  if (!response.ok) {
    // Throw the whole response object for detailed error handling elsewhere
    throw response; 
  }

  // If response is OK (2xx), try to parse JSON, but handle non-JSON success cases
  try {
    // Check if response has content before attempting to parse
    const text = await response.text(); // Read body as text first
    if (text) {
        return JSON.parse(text); // If text exists, try parsing it
    } else {
        return { success: true }; // Indicate success if body is empty
    }
  } catch (error) {
    // If JSON.parse fails, it means the body wasn't valid JSON.
    // Since response.ok is true, we treat this as a successful request
    // potentially returning plain text confirmation (which we can ignore here).
    console.warn('Registration API returned non-JSON response on success:', error);
    return { success: true }; // Indicate success despite non-JSON body
  }
};