import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon, InfoIcon } from "@chakra-ui/icons";
import axios from "axios";
import ic from "../images/user.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from "../images/backround.jpg";
const UserProfile = () => {
  const [user, setUser] = useState(null);

  const userId = JSON.parse(localStorage.getItem("bloomb/user/id"));
  const data = {
    userId: userId,
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          "https://www.phoolvala.com/users/getUserById",
          data
        );

        console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const avatarSize = useBreakpointValue({
    base: "100px",
    md: "150px",
    lg: "200px",
  });

  if (!userId) {
    return (
      <>
        <Navbar />
        <Box
          justifyContent="center"
          alignItems="center"
          padding={4}
          bg="gray.200"
          backgroundImage={`url(${backgroundImage})`}
        >
          <Heading>Please Login First</Heading>
          <Image
            src={ic}
            alt="Profile Avatar"
            boxSize={avatarSize}
            fallback={<Box boxSize={avatarSize} bg="gray.200" />}
            borderRadius="full"
          />
        </Box>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        padding={4}
        bg="gray.200"
        backgroundImage={`url(${backgroundImage})`}
      >
        <Box
          maxW="lg"
          borderWidth={1}
          borderRadius="lg"
          bg="white"
          boxShadow="lg"
          overflow="hidden"
        >
          <Box padding={4}>
            <Flex justifyContent="center">
              <Image
                src={ic}
                alt="Profile Avatar"
                boxSize={avatarSize}
                fallback={<Box boxSize={avatarSize} bg="gray.200" />}
                borderRadius="full"
              />
            </Flex>
            <Heading as="h1" size="lg" textAlign="center" mt={4}>
              {user && user[0]?.fullName}
            </Heading>
            <Flex justifyContent="center" mt={2}>
              {/* <Text color="gray.500">{user[0].email}</Text> */}
            </Flex>
            <Flex justifyContent="center" mt={2}>
              {/* <Text color="gray.500">{user[0].mobileNo}</Text> */}
            </Flex>
            <Flex justifyContent="center" mt={2}>
              {/* <Text color="gray.500">{user[0].address}</Text> */}
            </Flex>
            {/* Add other user information here */}
            <Flex justifyContent="center" mt={4}>
              <Box
                as={EmailIcon}
                boxSize={6}
                color="gray.500"
                mr={2}
                _hover={{ color: "gray.700" }}
              />
              <Text color="gray.500">{user && user[0]?.email}</Text>
            </Flex>
            <Flex justifyContent="center" mt={2}>
              <Box
                as={PhoneIcon}
                boxSize={6}
                color="gray.500"
                mr={2}
                _hover={{ color: "gray.700" }}
              />
              <Text color="gray.500">{user && user[0]?.mobileNo}</Text>
            </Flex>
            <Flex justifyContent="center" mt={2}>
              <Box
                as={InfoIcon}
                boxSize={6}
                color="gray.500"
                mr={2}
                _hover={{ color: "gray.700" }}
              />
              <Text color="gray.500">{user && user[0]?.address}</Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default UserProfile;
