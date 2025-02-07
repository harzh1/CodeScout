import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get("token");

    if (!token) {
      console.error("No token found");
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);

    try {
      const decoded = jwtDecode(token);
      localStorage.setItem("userId", decoded.userId);
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
      return;
    }

    window.history.replaceState({}, document.title, window.location.pathname);
    navigate("/");
  }, [navigate]);

  return <h2>Authenticating...</h2>;
};

export default OAuthCallback;
