import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

import DivileryNavbar from "./DivileryNavbar";
import backgroundImage from "../../images/backround.jpg";
const SignupDeliveyPage = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    password: "",
    city: "",
    state: "",
    address: "",
    pinCode: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toast = useToast();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      fullName: formValues.fullName,
      email: formValues.email,
      mobileNo: formValues.mobileNo,
      password: formValues.password,
      city: formValues.city,
      state: formValues.state,
      address: formValues.address,
      pinCode: formValues.pinCode,
    };

    try {
      const response = await axios.post(
        "https://www.bloomb.in/delivery/register",
        data
      );

      // Handle successful response here

      toast({
        title: response.data.message,
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Handle error response here
      //   console.log(error.response.data);
      toast({
        title: "Error",
        description: "Error Please try after sometimes",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <DivileryNavbar />
      <Box p={6} bgImage={`url(${backgroundImage})`}>
        <Heading as="h1" textAlign="center" mb={8}>
          Delivery Signup
        </Heading>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          p={8}
          maxW="lg"
          mx="auto"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl mb={4}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  name="fullName"
                  type="text"
                  placeholder="Enter delivey boy name"
                  value={formValues.fullName}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Mobile No.</FormLabel>
                <Input
                  name="mobileNo"
                  type="tel"
                  placeholder="Enter mobile number"
                  value={formValues.mobileNumber}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>City</FormLabel>
                <Input
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  value={formValues.city}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Pin Code</FormLabel>
                <Input
                  name="pinCode"
                  type="text"
                  placeholder="Enter Pincode"
                  value={formValues.pinCode}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>State</FormLabel>
                <Input
                  name="state"
                  type="text"
                  placeholder="Enter state"
                  value={formValues.state}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  type="text"
                  placeholder="Enter address"
                  value={formValues.address}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Flex gap={"1rem"}>
                <Button type="submit" colorScheme="blue" w="100%">
                  Signup
                </Button>
                <Link to={"/deliveryLogin"}>
                  <Button colorScheme="blue" w="100%">
                    Login
                  </Button>
                </Link>
              </Flex>
            </VStack>
          </form>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SignupDeliveyPage;
