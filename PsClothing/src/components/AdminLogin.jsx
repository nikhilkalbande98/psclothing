import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
 
  Flex,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import { ViewOffIcon } from "@chakra-ui/icons";
import AdminNavbar from "./AdminNavbar";



const AdminLogin = () => {
  // const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [password2, setpassword2] = useState("");
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);
  // const [showModal2, setShowModal2] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  // const buttonWidth = useBreakpointValue({ base: "100%", md: "auto" });
  // const handleForgotPasswordd = async () => {
  //   const data2 = { email: email2, password: password2, otp: otp };
  //   console.log(data2);
  //   try {
  //     const response = await axios.post(
  //       "https://www.bloomb.in/users/submitForgetPassword",
  //       data2
  //     );
  //     // Handle successful response here
  //     console.log(response);
  //     toast({
  //       title: response.data.message,
  //       description: response.data.message,
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     // Close the modal

  //     setShowModal2(false);
  //   } catch (error) {
  //     // Handle error response here
  //     console.log(error.response);
  //     toast({
  //       title: "Error",
  //       description: error.response.data.message,
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  // };
  // const handleForgotPassword = async () => {
  //   const data = { email: email };
  //   console.log(data);
  //   try {
  //     const response = await axios.post(
  //       "https://www.bloomb.in/users/forgetPassword",
  //       data
  //     );
  //     // Handle successful response here
  //     console.log(response);
  //     toast({
  //       title: response.data.message,
  //       description: response.data.message,
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     // Close the modal
  //     setShowModal(false);
  //     setShowModal2(true);
  //   } catch (error) {
  //     // Handle error response here
  //     console.log(error.response.data);
  //     toast({
  //       title: "Error",
  //       description: error.response.data.message,
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  // };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://psclothing.onrender.com/api/v1/users/login",
        data
      );
      // console.log(response)

      if (response.data.user === "prachi@psclothing.co.in") {
        localStorage.setItem("psclothing/admin/token", response.data.token);
        const token = localStorage.getItem("psclothing/admin/token");
        // console.log(token)
        toast({
          title: response.data.message,
          description: "Login Successfull",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        localStorage.setItem(
          "psclothing/admin/login",
          JSON.stringify(response.data.user)
        );
        localStorage.setItem(
          "psclothing/admin/id",
          JSON.stringify(response.data.user._id)
        );
        navigate("/dashboard");
      } else {
        toast({
          title: "Please Check Your Password",
          description: "or email Id",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle error response here
      //   console.log(error.response.data);
      toast({
        title: "Error",
        description: "Wrong Password Please Check Your Password",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("psclothing/admin/token");

    // You can then use the token for authorization in your API requests
  }, []);

  return (
    <>
      <AdminNavbar />
      <Box >
        <Box
          maxWidth="500px"
          mx="auto"
          p={6}
          bg="white"
          boxShadow="md"
          borderRadius="md"
          maxHeight="500px"
          // backgroundImage={`url(${backgroundImage})`}
        >
          <Heading
            as="h2"
            size="xl"
            mb={6}
            textAlign="center"
            fontWeight="bold"
            color="purple.700"
          >
            Admin Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel
                htmlFor="mobile-no"
                fontWeight="bold"
                color="purple.700"
              >
                Enter E-mail id
              </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Button
                type="submit"
                colorScheme="purple"
                fontWeight="bold"
                borderRadius="full"
                margin={"1rem"}
                // width="150px"
              >
                Log in
              </Button>
              {/* <Link to={"/merchatSignup"}>
                <Button
                  colorScheme="purple"
                  fontWeight="bold"
                  borderRadius="full"
                  margin={"1rem"}
                  // width="150px"
                >
                  Sign Up
                </Button>
              </Link> */}
              {/* <Button
                colorScheme="purple"
                fontWeight="bold"
                borderRadius="full"
                margin={"1rem"}
                onClick={() => setShowModal(true)}
              >
                Forgot Password
              </Button> */}
            </Flex>
          </form>
        </Box>
      </Box>

      <Footer />
      {showModal && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg="white"
            p="6"
            borderRadius="md"
            boxShadow="md"
            maxW="500px"
            w="100%"
          >
            <Heading
              as="h3"
              size="md"
              textAlign="center"
              mb="6"
              color="purple.700"
              fontWeight="bold"
            >
              Forgot Password
            </Heading>
            <FormControl mb="4">
              <FormLabel htmlFor="email" fontWeight="bold" color="purple.700">
                Email Address
              </FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
            <Button
              colorScheme="purple"
              fontWeight="bold"
              borderRadius="full"
              margin={"1rem"}
              // onClick={handleForgotPassword}
            >
              Submit
            </Button>
            <Button
              colorScheme="purple"
              fontWeight="bold"
              borderRadius="full"
              margin={"1rem"}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AdminLogin;
