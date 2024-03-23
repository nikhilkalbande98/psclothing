import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.jpeg";
const DivileryNavbar = () => {
  const [show, setShow] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const handleToggle = () => setShow(!show);
  const user = localStorage.getItem("bloomb/delivey/id");
  const handleLogout = () => {
    localStorage.removeItem("bloomb/delivey/id");
    localStorage.removeItem("bloomb/delivey/login");
    setIsLoggedOut(true); // set isLoggedOut to true when the user logs out
  };
  return (
    <Box bg=" rgb(28, 28, 41)" px={4} boxShadow="md" p={7}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={<HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={handleToggle}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Link to={"#"}>
            <Image src={Logo} alt="Logo" boxSize="50px" />
          </Link>
          <HStack
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "flex" }}
          ></HStack>
        </HStack>
        <Flex alignItems={"center"}>
          {user && !isLoggedOut ? (
            <Box display={{ base: "none", md: "flex" }}>
              <Link to={"/"}>
                <Button variant="solid" size="md" mr={4} onClick={handleLogout}>
                  Log out
                </Button>
              </Link>
            </Box>
          ) : (
            <Box display={{ base: "none", md: "flex" }}>
              <Link to={"/signup"}>
                <Button variant="solid" size="md" mr={4}>
                  Sign Up
                </Button>
              </Link>
            </Box>
          )}
        </Flex>
      </Flex>

      {show ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {user && !isLoggedOut ? (
              <Link to={"/"}>
                <Button variant="solid" size="md" mr={4} onClick={handleLogout}>
                  Log out
                </Button>
              </Link>
            ) : (
              <Link to={"/signup"}>
                <Button variant="solid" size="md" mr={4}>
                  Sign Up
                </Button>
              </Link>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default DivileryNavbar;
