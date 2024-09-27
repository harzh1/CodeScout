import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import NavLinks from "./NavLinks";
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
function Header() {
  return (
    <header className="navhead">
      <div style={{ marginBottom: "10px", height: "60px" }}>
        <h1>
          <NavLink to="/">CodeScout</NavLink>
        </h1>
      </div>
      <div>
        <Stack direction="row" spacing={4} align="center" position={"relative"}>
          <NavLinks />

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
    </header>
  );
}

export default Header;
