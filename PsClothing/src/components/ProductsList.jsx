import React, { useEffect, useRef, useState, memo } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Textarea,
  Center,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  Radio,
  RadioGroup,
  Tooltip,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';

import {
  MdCheckCircle,
  MdOutlineEmail,
  MdSettings,
} from 'react-icons/md';

import contact from "../images/contact.jpg";
import axios from 'axios';
import offer from "../images/offer.png"

const ProductsList = () => {
  const [categories, setCategories] = useState([{ id: null, name: 'All Products' }]); // Add 'All Products' option
  const [selectedCategory, setSelectedCategory] = useState(null); // Set initially to 'All Products'
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();
  const token = localStorage.getItem('psclothing/user/token');
  const userId = localStorage.getItem('psclothing/user/id');
  const { isOpen: isOpenModal1, onOpen: onOpenModal1, onClose: onCloseModal1 } = useDisclosure()
  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onClose: onCloseModal2 } = useDisclosure()
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleRadioChange = (product) => (value) => {
    setSelectedProduct(value ? product.id : null);
    setValue(product.id, value);
  };
  
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const btnRef = useRef(null)
  const [formValid, setFormValid] = useState(false);

  // const [value, setValue] = React.useState('')
  const [productRadioValues, setProductRadioValues] = useState({});

  const initialFormData = {
    orderItems:cartData,
    shippingAddress1: '',
    shippingAddress2: '',
    city: '',
    zip: '',
    state: '',
    phone: '',
    user:userId
  };
  const setValue = (size, value) => {
    setProductRadioValues((prevValues) => ({
      ...prevValues,
      [size]: value,
    }));
  };

  const getValue = (size) => productRadioValues[size] || 'S';
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const isFormValid = validateForm(); // Implement the validateForm function
    setFormValid(isFormValid);
  };

  const validateForm = () => {
    const { shippingAddress1, city, zip, state, phone } = formData;
    if (shippingAddress1 && city  && phone && zip && state ) {
      return true; // Form is valid
    }
  
    return false; // Form is not valid
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValid) {

      return;
    }
  
    const updatedFormData = {
      ...formData,
      orderItems: cartData,
    };

  
    try {
      const response = await fetch('https://psclothing.onrender.com/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

  
      if (response.ok) 
      {
        toast({
          title: "Order Placed",
          description: "Order Successfully placed. Check your cart",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Optionally, you can reset the form or perform any other actions here.
        setFormData(initialFormData)
      }
      else
      {
        toast({
          title: "Something went wrong",
          description: "Please Login first",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } 
    catch (error) 
    {
      toast({
        title: "Error",
        description: "Check your internet connection",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  function addToCart(product) {
    if (isLoggedIn) {
      const existingCartItemIndex = cartData.findIndex((item) => item.product === product.id);

      if (existingCartItemIndex !== -1) {
        const updatedCartData = cartData.map((item, index) => {
          if (index === existingCartItemIndex) {
            return { ...item, size:productRadioValues, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });

        setCartData(updatedCartData);
        
      } else {
        setCartData((prevCartData) => [
          ...prevCartData,
          { quantity: 1, size:productRadioValues, product: product.id },
        ]);
      }
    } else {
      toast({
        title: "Error",
        description: "Please Login first",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  const increaseQuantity = (product) => {
    const updatedCartData = cartData.map((item) => {
      if (item.product === product.id) {
        return { ...item, size:productRadioValues, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
    setCartData(updatedCartData);
  };

  const decreaseQuantity = (product) => {
    const existingCartItem = cartData.find((item) => item.product === product.id);

    if (existingCartItem && existingCartItem.quantity > 1) {
      const updatedCartData = cartData.map((item) => {
        if (item.product === product.id) {
          return { ...item, size:productRadioValues, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
      setCartData(updatedCartData);
    } else {
      // If quantity is 1, remove the item from the cart
      const updatedCartData = cartData.filter((item) => item.product !== product.id);
      setCartData(updatedCartData);
    }
  };

  const fetchCategories = async () => {
    let response;
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second
  
    while (retryCount < maxRetries) {
      try {
        response = await fetch('https://psclothing.onrender.com/api/v1/categories');
  
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setCategories([{ id: '', name: 'All Products' }, ...data]);
            setSelectedCategory('');
            return;
          } else {
            // console.error('Response data is not an array');
            toast({
              title: "Error",
              description: "Please try again later.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            break; 
          }
        } else {
          // console.error('Failed to fetch categories. HTTP status:', response.status);
          toast({
            title: "Failed to load",
            description: "Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        // console.error('Failed to fetch categories', error);
        toast({
          title: "Failed to load",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
  
      // If the request failed, wait for a moment before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      retryCount++;
    }
  
    if (retryCount === maxRetries) {
      // console.error('Max retries reached. Failed to fetch categories.');
      toast({
        title: "Failed to load",
        description: "Check your internet connection",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  const [cartItem,setCartItem] = useState([])
  const total = 0;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const results = await Promise.all(
          cartData.map(async (el) => {
            let response;
            let retryCount = 0;
            const maxRetries = 3;
            const retryDelay = 1000; // 1 second
  
            while (retryCount < maxRetries) {
              response = await fetch(`https://psclothing.onrender.com/api/v1/products/${el.product}`);
  
              if (response.ok) {
                return response.json();
              }
  
              // If the request failed, wait for a moment before retrying
              await new Promise(resolve => setTimeout(resolve, retryDelay));
              retryCount++;
            }
  
            throw new Error(`Failed to fetch product with id ${el.product}`);
          })
        );
  
        setCartItem(results);
      } catch (error) {
        // console.error("Failed to fetch cart items:", error);
        toast({
          title: "Error loading",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    fetchCartItems();
  }, [cartData]);
 
  const [orderData,setOrderData] = useState([])
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://psclothing.onrender.com/api/v1/orders');
        if (response.status === 200) {
          setOrderData(response.data);
          // console.log("Order Data:", response.data);
        } else {
          console.error(`Failed to fetch orders. Server returned status code: ${response.status}`);
          toast({
            title: "Failed to load",
            description: "Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        // console.error("Failed to fetch orders:", error.message);
        toast({
          title: "Failed to load",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    fetchOrders();
  }, [cartItem]);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory.id);
    } else {
      fetchAllProducts();
    }
  }, [selectedCategory]);

  const fetchProducts = async (categoryId) => {
    let response;
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second
  
    while (retryCount < maxRetries) {
      try {
        response = await fetch(`https://psclothing.onrender.com/api/v1/products?categories=${categoryId}`);
  
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          return;
        } else {
          // console.error('Failed to fetch products. HTTP status:', response.status);
          toast({
            title: response.status,
            description: "Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        // console.error('Failed to fetch products', error);
        toast({
          title: "Error",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
  

      await new Promise(resolve => setTimeout(resolve, retryDelay));
      retryCount++;
    }
  
    if (retryCount === maxRetries) {
      // console.error('Max retries reached. Failed to fetch products.');
      toast({
        title: "Failed to load",
        description: "Check your internet connection",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

 const fetchAllProducts = async () => {
  let response;
  let retryCount = 0;
  const maxRetries = 3;
  const retryDelay = 1000; // 1 second

  while (retryCount < maxRetries) {
    try {
      response = await fetch('https://psclothing.onrender.com/api/v1/products');

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        return;
      } else {
        // console.error('Failed to fetch products. HTTP status:', response.status);
        toast({
          title: "Failed to load",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      // console.error('Failed to fetch products', error);
      toast({
        title: "Failed to load",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    // If the request failed, wait for a moment before retrying
    await new Promise(resolve => setTimeout(resolve, retryDelay));
    retryCount++;
  }

  if (retryCount === maxRetries) {
    // console.error('Max retries reached. Failed to fetch products.');
    toast({
      title: "Failed to load",
      description: "Check your internet connection",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};


useEffect(() => {
  const fetchData = async () => {
    try {
      await fetchCategories();
      if (token !== null) {
        setIsLoggedIn(true);
      }
      const isFormValid = validateForm();
      setFormValid(isFormValid);
    } catch (error) {
      // console.error('An error occurred while fetching data:', error);
      toast({
        title: "Error",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  fetchData();
}, []);


  return (
    <>

    <Flex justifyContent={['center','space-between']} width={'100%'} alignItems={['center','flex-start']} flexDirection={['column','row']}>
      {/* Left side - Category buttons */}
      <Box display={['flex','flex']} flexWrap={'wrap'} justifyContent={['space-evenly','center']} rowGap={['15px','15px']} width={['100%',"25%"]} py={8} px={0} bg={'gray.200'}>
        {categories.map((category) => (
          <Button
            key={category.id}
            _hover={{bg:'teal.400'}}
            variant={category === selectedCategory ? 'solid' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            w={['45%',"90%"]}
            // mb={['0px','20px']}
            fontSize={['14px','18px']}
            border={'1px solid gray'}
            bg={category === selectedCategory ? 'teal.600' : 'inherit'} // Add this line
            color={category === selectedCategory ? 'white' : 'inherit'}
          >
            {category.name}
          </Button>
        ))}
        
        <Box display={['none','block']} bgImage={`url(${contact})`} backgroundSize={'cover'} bgRepeat={'no-repeat'} borderRadius={'lg'}>
                  <Box m={8} color="#0B0E3F" py={5}>
            <Center fontSize={'22px'} fontWeight={'500'} pb={1}>Contact Us</Center>
            <hr />
                    <VStack spacing={5} mt={2}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800" />
                          </InputLeftElement>
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail color="gray.800" />
                          </InputLeftElement>
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button variant="solid" bg="#0D74FF" color="white" _hover={{}}>
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
      </Box>

      <Box w={['90%',"65%"]} marginTop={['30px','50px']}>
        <Text fontSize={['1.2rem',"2xl"]} fontWeight={'500'} textAlign={'center'}>
          Selected Category : {selectedCategory ? selectedCategory.name : 'All Products'}
        </Text>
        <Flex flexWrap={'wrap'} flexDirection={['column','row']} gap={'20px'} mt={5}>
          {products.map((el) => {
            const totalDiscount = el.price<el.originalPrice ? Math.round(100-((el.price/el.originalPrice)*100))+"%" : "0%"
            return(
            <Box borderWidth="1px" key={el.id} margin={'auto'} borderRadius="md" width={['80%','26%']}>
              <Card>
                {/* {
                  el.richDescription?(
                    <Image src={offer} position={'absolute'} width={['40px','60px']}/>
                  ):
                  ''
                } */}
                <CardBody>
                  <Image src={el.image} alt={el.name} borderRadius='lg' />
                  <Stack mt='6' spacing='3'>
                    <Heading fontSize={'16px'} fontWeight={'500'} height={'20px'}>
                      {el.name}
                    </Heading>
                    <Text fontSize={'14px'} color={'red'}>{el.richDescription?"Offers : "+el.richDescription:''}</Text>
                    <Flex justifyContent={'space-between'}>
                      <Flex gap={'10px'} alignItems={'end'}>
                        <Text color='blue.600' fontSize='18px'>
                          &#8377;{el.price}
                        </Text>
                        <Text color='red' fontSize='14px' fontWeight={'500'}>
                          <strike>
                            &#8377;{el.originalPrice}
                          </strike>
                        </Text>
                      </Flex>
                      <Text color='white' fontSize={['13px','15px']} display={'flex'} borderRadius={'50%'} bg={'red'} alignItems={'center'} justifyContent={'center'} width={['35px','45px']} height={['35px','45px']}>
                        {totalDiscount}
                      </Text>
                    </Flex>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Box>
                      <Box>
                      <RadioGroup onChange={handleRadioChange(el)} value={getValue(el.id)}>
                      <Stack direction='row'>
                        <Radio value='S'>S</Radio>
                        <Radio value='M'>M</Radio>
                        <Radio value='L'>L</Radio>
                        <Radio value='XL'>XL</Radio>
                      </Stack>
                    </RadioGroup>
                    {selectedProduct === el.id && (
        <ButtonGroup spacing='2'>
          <Button variant='ghost' colorScheme='blue' onClick={() => addToCart(el)}>
            Add to cart
          </Button>
          {isLoggedIn && (
            <Flex alignItems="center">
              <Button
                variant='ghost'
                colorScheme='blue'
                onClick={() => increaseQuantity(el)}
              >
                +
              </Button>
              <Text>
                {cartData.find((item) => item.product === el.id)?.quantity || 0}
              </Text>
              <Button
                variant='ghost'
                colorScheme='blue'
                onClick={() => decreaseQuantity(el)}
              >
                -
              </Button>
            </Flex>
          )}
        </ButtonGroup>
      )}
                      </Box>
                      <Box>
                        {
                          isLoggedIn && cartData.length!==0?
                        (<Button onClick={onOpenModal1} ref={btnRef}>
                          Go to the Cart
                        </Button>):
                        ''
                        }
                        <Modal
                        // initialFocusRef={initialRef}
                        finalFocusRef={btnRef}
                        isOpen={isOpenModal1}
                        onClose={onCloseModal1}
                        scrollBehavior={'outside'}
                        size={'full'}
                        
                      >
                        <ModalOverlay/>
                        <ModalContent maxH={{ base: '80vh', md: 'unset' }}>
                          <ModalHeader>Fill your address for shipping</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody pb={6} style={{'overflow':'auto'}} overflow={'auto'}>
                          <form onSubmit={handleSubmit}>
                            <Box>
                              <Flex justifyContent={'space-evenly'} flexDirection={['column','row']}>
                                <Box width={['100%','30%']}>
                                  <FormControl id="shippingAddress1">
                                    <FormLabel>Address 1</FormLabel>
                                    <Input
                                      type="text"
                                      name="shippingAddress1"
                                      value={formData.shippingAddress1}
                                      onChange={handleChange}
                                      required
                                    />
                                  </FormControl>
                                  <FormControl id="shippingAddress2">
                                    <FormLabel>Address 2</FormLabel>
                                    <Input
                                      type="text"
                                      name="shippingAddress2"
                                      value={formData.shippingAddress2}
                                      onChange={handleChange}
                                    />
                                  </FormControl>
                                  <FormControl id="city">
                                    <FormLabel>City</FormLabel>
                                    <Input
                                      type="text"
                                      name="city"
                                      value={formData.city}
                                      onChange={handleChange}
                                      required
                                    />
                                  </FormControl>
                                  <FormControl id="zip">
                                    <FormLabel>ZIP</FormLabel>
                                    <Input
                                      type="text"
                                      name="zip"
                                      value={formData.zip}
                                      onChange={handleChange}
                                      required
                                    />
                                  </FormControl>
                                  <FormControl id="state">
                                    <FormLabel>State</FormLabel>
                                    <Input
                                      type="text"
                                      name="state"
                                      value={formData.state}
                                      onChange={handleChange}
                                      required
                                    />
                                  </FormControl>
                                  <FormControl id="phone">
                                    <FormLabel>Phone</FormLabel>
                                    <Input
                                      type="number"
                                      name="phone"
                                      value={formData.phone}
                                      onChange={handleChange}
                                      required
                                    />
                                  </FormControl>
                                  <Box>
                                    <Text color={'red'} textAlign={'center'} mt={'15px'}>All fields required</Text>
                                  </Box>
                                </Box>
                                <Box wwidth={['100%','30%']}>
                                  <Text>Terms & Conditions</Text>
                                    <Box marginTop={'20px'}>
                                      <Text color={'red'}>Note: Cash On Delivery not available</Text>
                                    </Box>
                                    <Box mt={'20px'} >
                                            <Text>Read the below...</Text>
                                            <hr />
                                      <Heading fontSize={'18px'} mt={'10px'} mb={'10px'}>Return / exchange and refund policy</Heading>
                                          <Box paddingLeft={'15px'}>
                                            <List spacing={3}>
                                              <ListItem>
                                                <ListIcon as={MdCheckCircle} color='green.500' />
                                                Easy return- 5 days return policy
                                              </ListItem>
                                              <ListItem>
                                                <ListIcon as={MdCheckCircle} color='green.500' />
                                                100% authentic- product secure directly
                                              </ListItem>
                                              <ListItem>
                                                <ListIcon as={MdCheckCircle} color='green.500' />
                                                Free delivery on order above 500 rupee only
                                              </ListItem>
                                              <ListItem>
                                                <ListIcon as={MdSettings} color='red' />
                                                <Button onClick={onOpenModal2} ref={btnRef} textDecoration={'none'} transition={'all 0.3s ease-in-out'} padding={0} margin={0} color={'blue'} bg={'none'} _hover={{bg:'none',color:'red',transform:'scale(1.03)'}}>View more about our policies</Button>
                                              </ListItem>
                                              <Modal
                                                blockScrollOnMount={false}
                                                finalFocusRef={btnRef}
                                                scrollBehavior={'inside'}
                                                size={'xl'}
                                                isOpen={isOpenModal2}
                                                onClose={onCloseModal2}
                                              >
                                                <ModalOverlay />
                                                <ModalContent>
                                                  <ModalHeader>PS Clothing policies</ModalHeader>
                                                  <ModalCloseButton />
                                                  <ModalBody style={{ maxHeight: '80vh', overflowY: 'scroll' }}>
                                                  <Box p={4} maxW="600px" mx="auto">
                                                    <Heading as="h2" fontSize="2xl" textAlign="center" mb={4}>
                                                      Return / Exchange and Refund Policy
                                                    </Heading>
                                                    <Text mb={4}>
                                                      You can exchange and return the order within 5 days of delivery of the product. To exchange, please email us at{' '}
                                                      <a style={{color:'blue'}} href="mailto:prachi@psclothing.co.in">prachi@psclothing.co.in</a>.
                                                    </Text>
                                                    <Text fontWeight="bold" mb={2}>
                                                      We welcome exchange on the following terms:
                                                    </Text>
                                                    <List spacing={3}>
                                                      <ListItem>
                                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                                        If a wrong product or size has been received.
                                                      </ListItem>
                                                      <ListItem>
                                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                                        Manufacturing defect on the received product.
                                                      </ListItem>
                                                      </List>
                                                    <Text fontWeight="bold" mt={4}>
                                                      Refund:
                                                    </Text>
                                                    <List spacing={3}>
                                                      <ListItem>
                                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                                        All refunds will be processed after the quality check of the received items within 7-10 business days of receiving
                                                      the merchandise back at our warehouse.
                                                      </ListItem>
                                                      <ListItem>
                                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                                        If the product fails to meet our quality check, it will be notified to the customer and sent back directly.
                                                      </ListItem>
                                                      </List>
                                                    <Text mt={4} fontWeight="bold">
                                                      Note:
                                                    </Text>
                                                    <List spacing={3}>
                                                      <ListItem>
                                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                                        No COD on any product.
                                                      </ListItem>
                                                      <ListItem>
                                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                                        Opening video is a must for all the products, whether they are to be returned or refunded.
                                                      </ListItem>
                                                      </List>
                                                    <Text mt={4} fontWeight="bold">
                                                      Important:
                                                    </Text>
                                                    <List spacing={3}>
                                                    <ListItem>
                                                    <ListIcon as={MdSettings} color='green.500' />
                                                    Any damage to the product will not be accepted for refund or exchange.
                                                      </ListItem>
                                                    </List>
                                                    <Text mt={4} fontWeight={'bold'}>Information Security</Text>
                                                    <List spacing={3}>
                                                      <ListItem>
                                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                                        We take data security seriously and implement industry-standard measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
                                                      </ListItem>
                                                      <ListItem>
                                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                                        We only collect the necessary personal information required for providing our services. We do not sell, rent, or share your personal information with third parties without your consent.
                                                      </ListItem>
                                                      <ListItem>
                                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                                        We are committed to being transparent about how we collect, use, and share your personal information. Our Privacy Policy provides detailed information about these practices.
                                                      </ListItem>
                                                    </List>
                                                  </Box>
                                                  </ModalBody>
                                                  <ModalFooter>
                                                    <Button colorScheme='blue' mr={3} onClick={onCloseModal2}>
                                                      Close
                                                    </Button>
                                                  </ModalFooter>
                                                </ModalContent>
                                              </Modal>
                                            </List>
                                          </Box>
                                        </Box>
                                      <Flex justifyContent={'center'} mt={'25px'}>
                                    <Tooltip label={!formValid ? 'Fill the form and select the Payment mode first':'Place your order'} placement='top'>
                                    <Button
                                      type="submit"
                                      onClick={onCloseModal1}
                                      colorScheme="teal"
                                      isDisabled={!formValid} // Disable the button if either the form is not valid or no payment option is selected
                                    >
                                    Add Product to Cart
                                    </Button>
                                    </Tooltip>
                                    </Flex>
                                </Box>
                                <Box width={['100%','30%']} border={'1px solid'} borderRadius={'10px'} padding={'15px'}>
                                  <Box textAlign={'center'}  mb={'10px'}>
                                          <Text borderRadius={'10px'} padding={'8px'} fontSize={'18px'} color={'red'} fontWeight={'500'}>
                                            Total Price : &#8377;&nbsp;
                                            {cartData.reduce((total, item) => {
                                              const product = cartItem.find((el) => el.id === item.product);
                                              if (product) {
                                                const quantity = item.quantity;
                                                const subtotal = product.price * quantity;
                                                
                                                return total + subtotal;
                                              }
                                              return total;
                                            }, 0).toFixed(2)}
                                          </Text>
                                          <hr />
                                        </Box>
                                    <Flex justifyContent={'space-evenly'}>
                                      <Box>
                                        
                                        {cartData.map((cartItemData) => {
                                          const product = cartItem.find((el) => el.id === cartItemData.product);
                                          if (product) {
                                            const quantity = cartItemData.quantity;
                                            const subtotal = product.price * quantity;
                                            // console.log(cartItemData.size[cartItemData.product])
                                            return (
                                              <Box key={product.id} marginBottom={'20px'} fontWeight={'500'}>
                                                <Flex justifyContent={'space-between'} alignItems={'center'}>
                                                  <Box width={'25%'}>
                                                    <Image width={'90%'} borderRadius={'10px'} src={product.image} alt={product.name} />
                                                  </Box>
                                                  <Box width={'40%'}>
                                                    <Text fontSize={'13px'}>{product.name}</Text>
                                                    <Text fontSize={'14px'} color={'red'}>&#8377;{product.price}</Text>
                                                    <Text fontSize={'13px'}>{`Quantity : ${quantity}`}</Text>
                                                    <Text fontSize={'13px'}>{`Size : ${cartItemData.size[cartItemData.product]}`}</Text>
                                                  </Box>
                                                  <Box width={'25%'}>
                                                    <Text>{`SubTotal`}</Text>
                                                    <Text color={'red'}>&#8377;{subtotal.toFixed(2)}</Text>
                                                  </Box>
                                                </Flex>
                                              </Box>
                                            );
                                          }
                                          return null;
                                        })}
                                      </Box>
                                    </Flex>
                                  </Box>
                              </Flex>
                              <Flex justifyContent={'center'}>
                              </Flex>
                            </Box>
                          </form>
                          </ModalBody>
                        </ModalContent>
                      </Modal>
                      </Box>
                    </Box>
                </CardFooter>
              </Card>
            </Box>
          )})}
        </Flex>
      </Box>
    </Flex>
    </>
  );
};

export default memo(ProductsList);