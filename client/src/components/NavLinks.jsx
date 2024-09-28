import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const NavLinks = () => {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <NavLink to={`/`}>
        <Button
          colorScheme="teal"
          variant={activeButton === "Home" ? "solid" : "outline"}
          onClick={() => handleButtonClick("Home")}
        >
          Home
        </Button>
      </NavLink>

      <NavLink to={`/About`}>
        <Button
          colorScheme="teal"
          variant={activeButton === "About" ? "solid" : "outline"}
          onClick={() => handleButtonClick("About")}
        >
          About
        </Button>
      </NavLink>

      <NavLink to={`/Ratedquestions`}>
        <Button
          colorScheme="teal"
          variant={activeButton === "RatedQuestions" ? "solid" : "outline"}
          onClick={() => handleButtonClick("RatedQuestions")}
        >
          RatedQuestions
        </Button>
      </NavLink>
    </>
  );
};

export default NavLinks;
