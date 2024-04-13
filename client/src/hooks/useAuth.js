function useAuth() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken && accessToken.length > 0) {
    return true;
  } else {
    return false;
  }
}

export default useAuth;
