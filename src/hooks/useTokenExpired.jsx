
import { jwtDecode } from "jwt-decode";

const useTokenExpired = () => {
  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        return true; // Token is expired
      } else {
        return false; // Token is valid
      }
    } catch (error) {
      console.error("Invalid token:", error);
      return true; // Consider token as expired if there's an error decoding
    }
  };

  return isTokenExpired;
};

export default useTokenExpired;
