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
    return defaultMessage;
  }