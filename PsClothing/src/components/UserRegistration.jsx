import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function UserRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    isAdmin: false, // Default value for isAdmin
    street: '',
    apartment: '',
    zip: '',
    city: '',
    state: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://psclothing.onrender.com/api/v1/users/register', formData);
      // console.log('User registered:', response.data);
      toast({
        title: "Success",
        description: "User registration successfull!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      document.querySelector('.signUp').disabled = true;
      // Handle success or redirect to a different page.
    } catch (error) {
      // console.error('Registration failed:', error);
      toast({
        title: "Registration Failed",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // Handle the error, e.g., display an error message.
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    });
  };

  return (
    <>
    <Navbar/>
    <Flex align={'center'} justify={'center'}>
      <Stack mx={'auto'} mt={5} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            {/* <Text align={'center'}>
              Already a user? <Link color={'blue.400'}>Login</Link>
            </Text> */}
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Phone</FormLabel>
                <Input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </FormControl>
              {/* <FormControl id="isAdmin" isRequired>
                <FormLabel>Is Admin</FormLabel>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                />
              </FormControl> */}
              <FormControl id="street">
                <FormLabel>Street</FormLabel>
                <Input type="text" name="street" value={formData.street} onChange={handleChange} />
              </FormControl>
              <FormControl id="apartment">
                <FormLabel>Apartment</FormLabel>
                <Input type="text" name="apartment" value={formData.apartment} onChange={handleChange} />
              </FormControl>
              <FormControl id="zip">
                <FormLabel>ZIP</FormLabel>
                <Input type="text" name="zip" value={formData.zip} onChange={handleChange} />
              </FormControl>
              <FormControl id="city">
                <FormLabel>City</FormLabel>
                <Input type="text" name="city" value={formData.city} onChange={handleChange} />
              </FormControl>
              <FormControl id="state">
                <FormLabel>State</FormLabel>
                <Input type="text" name="state" value={formData.state} onChange={handleChange} />
              </FormControl>
              <Button
              className='signUp'
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
    </>
  );
}
