export async function parseApiErrorResponse(response, defaultMessage) {
    try {
      const errorData = await response.clone().json();
      // 1. Проверяем стандартное поле 'message'
      if (errorData && errorData.message) {
        return errorData.message;
      }
      // 2. Проверяем формат {'field': ['error']}
      // Преобразуем его в {'field': 'error'}
      if (errorData && typeof errorData === 'object' && !errorData.message) {
          const fieldErrors = {};
          let hasFieldErrors = false;
          for (const key in errorData) {
              if (Array.isArray(errorData[key]) && errorData[key].length > 0) {
                  // Берем первое сообщение для поля
                  fieldErrors[key] = errorData[key][0]; 
                  hasFieldErrors = true;
              }
          }
          if (hasFieldErrors) {
              return fieldErrors; // Возвращаем объект с ошибками полей
          }
      }
    } catch (jsonError) {
        // Ошибка парсинга JSON, пытаемся прочитать как текст
        try {
          const errorText = await response.text();
          if (errorText) return errorText;
        } catch (textError) {
            // Не удалось получить ни JSON, ни текст
        }
    }
    // Если ничего не нашли, возвращаем сообщение по умолчанию
    return defaultMessage;
  }