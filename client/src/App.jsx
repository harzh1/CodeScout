import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Container from "./components/Container";
import Practice from "./components/Practice";
import RatedQuestions from "./components/RatedQuestions";
import NavLinks from "./components/NavLinks";
import { Divider } from "@chakra-ui/react";
import LoginPage from "./components/Loginpage";
import SignupPage from "./components/SignupPage"; // Import Signup component
import { useLocation } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";

function App() {
  const [activeButton, setActiveButton] = useState("Home");
  const location = useLocation(); // Get the current location

  const token = localStorage.getItem("token");

  // Update active button when the location (URL) changes
  useEffect(() => {
    const path = location.pathname;

    // Match the path with button names to set the active button
    if (path === "/") {
      setActiveButton("Home");
    } else if (path === "/Practice") {
      setActiveButton("About");
    } else if (path === "/Ratedquestions") {
      setActiveButton("RatedQuestions");
    } else if (path === "/Login") {
      setActiveButton("Login");
    } else if (path === "/signup") {
      setActiveButton("signup");
    }
  }, [location]); // This effect runs every time the location changes

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      {/* Conditionally render the Login or Signup components based on active button */}
      {activeButton === "Login" ? (
        <LoginPage />
      ) : activeButton === "signup" ? (
        <SignupPage />
      ) : (
        <>
          <NavLinks handleButtonClick={() => handleButtonClick} />
          <Divider />
          <Routes>
            <Route path="/" element={<Container />} />
            <Route path="/Practice" element={<Practice />} />
            <Route path="/Ratedquestions" element={<RatedQuestions />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/signup" element={<SignupPage />} />{" "}
            {/* Route for signup */}
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
