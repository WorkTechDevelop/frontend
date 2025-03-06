export const setAuthToken = (token) => {
  if (token) {
      localStorage.setItem('authToken', token);
      console.log('Token saved:', token);
  } else {
      localStorage.removeItem('authToken');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
}; 