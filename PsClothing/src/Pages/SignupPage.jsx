import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Flex,
  useBreakpointValue,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ViewOffIcon } from "@chakra-ui/icons";
import backgroundImage from "../images/backround.jpg";
const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pinCode, setPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [route, setRoute] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const buttonWidth = useBreakpointValue({ base: "100%", md: "auto" });
  const user_id = JSON.parse(localStorage.getItem("bloomb/user/id"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      fullName: fullName,
      mobileNo: mobileNo,
      city: city,
      email: email,
      address: address,
      pinCode: pinCode,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/users",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful response here
      //   console.log(response);
      toast({
        title: response.message,
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      // Handle error response here
      //   console.log(error.response.data);
      toast({
        title: "Error",
        // description: response.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleRoute = () => {
    setRoute("user");
    navigate("/signup");
  };
  const handleRoute2 = () => {
    setRoute("merchant");
    navigate("/merchatSignup");
  };
  const handleRoute3 = () => {
    setRoute("deliveyboy");
    navigate("/delivetboySignup");
  };
  if (route === "") {
    return (
      <Box
        bgImage={`url(${backgroundImage})`}
        bgSize="cover"
        bgPosition="center"
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading textAlign="center" as="h1" size="2xl" mb={8}>
          Signup Page
        </Heading>
        <Flex
          justify="center"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Button
            onClick={() => handleRoute()}
            mr={{ base: 0, md: 4 }}
            mb={{ base: 4, md: 0 }}
            size="lg"
            variant="outline"
            colorScheme="blueGray"
          >
            Signup for User
          </Button>
          <Button
            onClick={() => handleRoute2()}
            mr={{ base: 0, md: 4 }}
            mb={{ base: 4, md: 0 }}
            size="lg"
            variant="outline"
            colorScheme="blueGray"
          >
            Signup for Merchant
          </Button>
          <Button
            onClick={() => handleRoute3()}
            mr={{ base: 0, md: 4 }}
            mb={{ base: 4, md: 0 }}
            size="lg"
            variant="outline"
            colorScheme="blueGray"
          >
            Signup for Delivery Boy
          </Button>
        </Flex>
      </Box>
    );
  } else {
    return (
      <>
        <Navbar />
        <Box backgroundImage={`url(${backgroundImage})`}>
          <Box
            maxWidth="500px"
            mx="auto"
            mt={8}
            p={6}
            bg="white"
            boxShadow="md"
            borderRadius="md"
          >
            <Heading
              as="h2"
              size="xl"
              mb={6}
              textAlign="center"
              fontWeight="bold"
              color="purple.700"
            >
              Sign up
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel
                  htmlFor="full-name"
                  fontWeight="bold"
                  color="purple.700"
                >
                  Full Name
                </FormLabel>
                <Input
                  type="text"
                  id="full-name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel
                  htmlFor="mobile-no"
                  fontWeight="bold"
                  color="purple.700"
                >
                  Mobile Number
                </FormLabel>
                <Input
                  type="tel"
                  id="mobile-no"
                  placeholder="Enter your mobile number"
                  value={mobileNo}
                  onChange={(event) => setMobileNo(event.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="email" fontWeight="bold" color="purple.700">
                  Email
                </FormLabel>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="city" fontWeight="bold" color="purple.700">
                  City
                </FormLabel>
                <Input
                  type="text"
                  id="city"
                  placeholder="Enter your city"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="pin" fontWeight="bold" color="purple.700">
                  Pin Code
                </FormLabel>
                <Input
                  type="text"
                  id="pinCode"
                  placeholder="Enter your Pin Code"
                  value={pinCode}
                  onChange={(event) => setPin(event.target.value)}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel
                  htmlFor="address"
                  fontWeight="bold"
                  color="purple.700"
                >
                  Address
                </FormLabel>
                <Input
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </FormControl>
              <FormControl mb={6}>
                <FormLabel
                  htmlFor="password"
                  fontWeight="bold"
                  color="purple.700"
                >
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <ViewOffIcon
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </ViewOffIcon>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Flex>
                <Flex>
                  <Button
                    type="submit"
                    colorScheme="purple"
                    fontWeight="bold"
                    borderRadius="full"
                    width={buttonWidth}
                    mr={2}
                  >
                    Sign up
                  </Button>
                  <Link to={"/login"}>
                    <Button
                      colorScheme="purple"
                      fontWeight="bold"
                      borderRadius="full"
                      width={buttonWidth}
                    >
                      Login
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            </form>
          </Box>
        </Box>

        <Footer />
      </>
    );
  }
};

export default Signup;
