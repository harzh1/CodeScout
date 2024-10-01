import React, { useState, useEffect } from "react";
import { MdLogout } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { Button, Stack } from "@chakra-ui/react";
import {
  Avatar,
  Wrap,
  WrapItem,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from "@chakra-ui/react";

const NavLinks = ({ handleButtonClick }) => {
  const [activeButton, setActiveButton] = useState("Home");
  const location = useLocation(); // Get the current location

  // Update active button when the location (URL) changes
  useEffect(() => {
    const path = location.pathname;

    // Match the path with button names to set the active button
    if (path === "/") {
      setActiveButton("Home");
    } else if (path === "/Practice") {
      setActiveButton("Practice");
    } else if (path === "/Ratedquestions") {
      setActiveButton("RatedQuestions");
    } else if (path === "/Login") {
      setActiveButton("Login");
    } else if (path === "/signup") {
      setActiveButton("Signup");
    }
  }, [location]); // This effect runs every time the location changes

  return (
    <>
      <div className="navlinks">
        <div style={{ marginBottom: "10px", height: "60px" }}>
          <h1>
            <NavLink to="/" onClick={() => handleButtonClick("Home")}>
              CodeScout
            </NavLink>
          </h1>
        </div>
        <div>
          <Stack direction="row" spacing={4} align="center" position={"relative"}>
            <NavLink to={`/`} onClick={() => handleButtonClick("Home")}>
              <Button
                colorScheme="teal"
                variant={activeButton === "Home" ? "solid" : "outline"}
              >
                Home
              </Button>
            </NavLink>

            <NavLink to={`/Practice`} onClick={() => handleButtonClick("Practice")}>
              <Button
                colorScheme="teal"
                variant={activeButton === "Practice" ? "solid" : "outline"}
              >
                Practice
              </Button>
            </NavLink>

            <NavLink to={`/Ratedquestions`} onClick={() => handleButtonClick("RatedQuestions")}>
              <Button
                colorScheme="teal"
                variant={activeButton === "RatedQuestions" ? "solid" : "outline"}
              >
                RatedQuestions
              </Button>
            </NavLink>
            
            <NavLink to={`/Login`} onClick={() => handleButtonClick("Login")}>
              <Button
                colorScheme="teal"
                variant={activeButton === "Login" ? "solid" : "outline"}
              >
                Login/Signup
              </Button>
            </NavLink>

            <Menu>
              <MenuButton as={Button} colorScheme="white">
                <Wrap>
                  <WrapItem>
                    <Avatar
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    />
                  </WrapItem>
                </Wrap>
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem color="red.500"> 
                    Log Out
                    <Box as="span" ml="2">
                      <MdLogout />
                    </Box>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default NavLinks;
