import React, { useState, useEffect } from 'react';
import { Button, Flex, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react';


import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Check if the user is already logged in (e.g., by checking a token in localStorage)
    const token = localStorage.getItem('psclothing/user/token'); // Replace with your token storage mechanism
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://psclothing.onrender.com/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      // console.log("Login",response)
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      
      const data = await response.json();
      
      // Handle the response from your backend here, such as storing the token and user data.
      localStorage.setItem('psclothing/user/token', data.token); // Store the token in localStorage
      localStorage.setItem('psclothing/user/id', data.id);
      
      setIsLoggedIn(true);
      
      if (data.user === "prachi@psclothing.co.in") {
        navigate("/dashboard");
        
    }
    
    window.location.reload();
    
      toast({
        title: data.message,
        description: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // console.error(error);
      // Handle login error, such as displaying an error toast.
      toast({
        title: "Login Error",
        description: "Something went wrong. Please check your password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  // const handleLogout = () => {
  //   // Handle the logout action, such as clearing the token and resetting the login state.
  //   localStorage.removeItem('psclothing/user/token'); // Remove the token from localStorage
  //   localStorage.clear();
  //   setIsLoggedIn(false);
  // };

  return (
    <>
    <VStack spacing={4} align="stretch" mt={'10px'}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      
        <Button colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
      
      <Flex justifyContent={'end'} alignItems={'center'}>
        {/* <Text color={'#002A53'} fontSize={'16px'} fontWeight={'500'}>Create a new Account here</Text> */}
        <Link to={'userregister'}>
        <Button bg={'#002A53'} color='white' _hover={{bg:'#002A53',color:'white'}}>Click here for New Registration</Button>
        </Link>
      </Flex>
    </VStack>
      
    </>
  );
};

export default UserLogin;
