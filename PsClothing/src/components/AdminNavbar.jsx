import { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";

const AdminNavbar = () => {
  const [show, setShow] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleToggle = () => setShow(!show);
  const user = localStorage.getItem("psclothing/admin/login");
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    setIsLoggedOut(true); // set isLoggedOut to true when the user logs out
    navigate('/')
    window.location.reload()
  };

  useEffect(() => {
    // Check if the user is already logged in (e.g., by checking a token in localStorage)
    const token = localStorage.getItem('psclothing/user/token'); // Replace with your token storage mechanism
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
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
        <HStack alignItems={"center"}>
          <Link to={"/"} onClick={handleLogout}>
            <Image src={Logo} alt="Logo" width={'130px'} />
          </Link>
          <HStack
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "flex" }}
          ></HStack>
        </HStack>
        <Flex alignItems={"center"}>
          
            <Box display={{ base: "none", md: "flex" }}>
              <Link to={"/"}>
                <Button variant="solid" size="md" mr={4} onClick={handleLogout}>
                  Logout
                </Button>
              </Link>
            </Box>
          
          <IconButton
            size={"md"}
            variant="ghost"
            aria-label={"User"}
            icon={<FaUserCircle />}
            bg={"white"}
          />
        </Flex>
      </Flex>

      {show ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <Box>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.400" />}
                />
                <Input
                  type="text"
                  placeholder="Search"
                  bg="white"
                  borderColor="gray.200"
                />
              </InputGroup>
            </Box>
            
            {isLoggedIn ? (
              <Link to={"/merchatDashboard"}>
                <Button variant="solid" size="md" mr={4} onClick={handleLogout}>
                  Log out
                </Button>
              </Link>
            ) : (
              <Link to={"/merchatSignup"}>
                <Button variant="solid" size="md" mr={4} >
                  Logout
                </Button>
              </Link>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default AdminNavbar;
