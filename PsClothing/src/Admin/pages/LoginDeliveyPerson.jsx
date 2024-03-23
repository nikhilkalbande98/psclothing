import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  useBreakpointValue,
  Flex,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { ViewOffIcon } from "@chakra-ui/icons";

import Footer from "../../components/Footer";
import bg from "../../images/backround.jpg";
import DivileryNavbar from "./DivileryNavbar";
const LoginDeliveyPerson = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email2, setEmail2] = useState("");
  const [password2, setpassword2] = useState("");
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const buttonWidth = useBreakpointValue({ base: "100%", md: "auto" });
  const handleForgotPasswordd = async () => {
    const data2 = { email: email2, password: password2, otp: otp };
    console.log(data2);
    try {
      const response = await axios.post(
        "https://www.bloomb.in/users/submitForgetPassword",
        data2
      );
      // Handle successful response here
      console.log(response);
      toast({
        title: response.data.message,
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Close the modal

      setShowModal2(false);
    } catch (error) {
      // Handle error response here
      console.log(error.response);
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleForgotPassword = async () => {
    const data = { email: email };
    console.log(data);
    try {
      const response = await axios.post(
        "https://www.bloomb.in/users/forgetPassword",
        data
      );
      // Handle successful response here
      console.log(response);
      toast({
        title: response.data.message,
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Close the modal
      setShowModal(false);
      setShowModal2(true);
    } catch (error) {
      // Handle error response here
      console.log(error.response.data);
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      mobileNo: mobileNo,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://www.bloomb.in/users/login",
        data
      );

      // Handle successful response here
      console.log(response);
      if (response.data.data.user.role == "deliveryPerson") {
        toast({
          title: response.data.message,
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        localStorage.setItem(
          "bloomb/delivey/login",
          JSON.stringify(response.data.data.user.fullName)
        );
        localStorage.setItem(
          "bloomb/delivey/id",
          JSON.stringify(response.data.data.user._id)
        );
        navigate("/deliveryDashboard");
      } else {
        toast({
          title: "Please Check Your Password",
          description: "& Mobile Number",
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

  return (
    <>
      <DivileryNavbar />
      <Box backgroundImage={`url(${bg})`}>
        <Box
          maxWidth="500px"
          mx="auto"
          p={6}
          bg="white"
          boxShadow="md"
          borderRadius="md"
          maxHeight="500px"
          backgroundImage={`url(${bg})`}
        >
          <Heading
            as="h2"
            size="xl"
            mb={6}
            textAlign="center"
            fontWeight="bold"
            color="purple.700"
          >
            Delivery Login Form
          </Heading>
          <form onSubmit={handleSubmit}>
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
              <Link to={"/delivetboySignup"}>
                <Button
                  colorScheme="purple"
                  fontWeight="bold"
                  borderRadius="full"
                  margin={"1rem"}
                  // width="150px"
                >
                  Sign Up
                </Button>
              </Link>
              <Button
                colorScheme="purple"
                fontWeight="bold"
                borderRadius="full"
                margin={"1rem"}
                onClick={() => setShowModal(true)}
              >
                Forgot Password
              </Button>
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
              onClick={handleForgotPassword}
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
      {showModal2 && (
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
              Entre The Details
            </Heading>
            <FormControl mb="4">
              <FormLabel htmlFor="email" fontWeight="bold" color="purple.700">
                Email Address
              </FormLabel>
              <Input
                type="email"
                id="email2"
                placeholder="Enter your email address"
                value={email2}
                onChange={(event) => setEmail2(event.target.value)}
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel htmlFor="email" fontWeight="bold" color="purple.700">
                New Password
              </FormLabel>
              <Input
                type="password"
                id="password2"
                placeholder="Enter New Password"
                value={password2}
                onChange={(event) => setpassword2(event.target.value)}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel htmlFor="email" fontWeight="bold" color="purple.700">
                Otp
              </FormLabel>
              <Input
                type="otp"
                id="otp"
                placeholder="Enter The Otp"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
              />
            </FormControl>
            <Button
              colorScheme="purple"
              fontWeight="bold"
              borderRadius="full"
              margin={"1rem"}
              onClick={handleForgotPasswordd}
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

export default LoginDeliveyPerson;
