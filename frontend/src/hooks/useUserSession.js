const useUserSession = () => {
  const getUserSessionData = () => {
    const userSessionData = localStorage.getItem('userSession');
    return userSessionData ? JSON.parse(userSessionData) : null;
  };

  return { getUserSessionData };
};

export { useUserSession };
