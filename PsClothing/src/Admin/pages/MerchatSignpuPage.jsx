import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Box,
  VStack,
  useToast,
  Flex,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";
import { Link } from "react-router-dom";
import backgroundImage from "../../images/backround.jpg";
import Footer from "../../components/Footer";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const MerchantSignupPage = () => {
  const [formValues, setFormValues] = useState({
    merchantName: "",
    email: "",
    mobileNo: "",
    password: "",
    city: "",
    state: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

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
      merchantName: formValues.merchantName,
      email: formValues.email,
      mobileNo: formValues.mobileNo,
      password: formValues.password,
      city: formValues.city,
      state: formValues.state,
      address: formValues.address,
    };

    try {
      // Get form data

      // Make API call to register merchant
      const response = await axios.post(
        "https://www.bloomb.in/merchants/merchantRegister",
        data
      );
      // Display success toast

      toast({
        title: "",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

    } catch (error) {

      // Display error toast
      toast({
        title: "Signup Failed",
        description: "An error occurred during signup.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <AdminNavbar />
      <Box p={6} backgroundImage={`url(${backgroundImage})`}>
        <Heading as="h1" textAlign="center" mb={8}>
          Admin Signup
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
                <FormLabel>Admin Name</FormLabel>
                <Input
                  name="merchantName"
                  type="text"
                  placeholder="Enter merchant name"
                  value={formValues.merchantName}
                  onChange={handleInputChange}
                  required
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
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Mobile No.</FormLabel>
                <Input
                  name="mobileNo"
                  type="tel"
                  placeholder="Enter mobile number"
                  value={formValues.mobileNo}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formValues.password}
                    onChange={handleInputChange}
                    required
                  />
                  <InputRightElement>
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>City</FormLabel>
                <Input
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  value={formValues.city}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Pin Code</FormLabel>
                <Input
                  name="pinCode"
                  type="text"
                  placeholder="Enter pin code"
                  value={formValues.pinCode}
                  onChange={handleInputChange}
                  required
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
                  required
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
                  required
                />
              </FormControl>
              <Flex gap={"1rem"}>
                <Button type="submit" colorScheme="blue" w="100%">
                  Signup
                </Button>
                <Link to={"/merchatLogin"}>
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

export default MerchantSignupPage;
