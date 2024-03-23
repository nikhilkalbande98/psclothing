// OrderDetail.js
import { Box, Button, Flex, Image, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import userlogo from "../images/user.png"
import logo from "../images/logo.png"

import axios from 'axios';
import Navbar from '../components/Navbar';

const CartPage = () => {

  const [count, setCount] = useState(0);
  // const { orderId } = useParams(); // Access the orderId from the route parameters
  const [orderDetail, setOrderDetail] = useState();
  const [btnShow,setBtnShow] = useState('block');
  const orderId = localStorage.getItem('psclothing/userorder/id')
  const toast = useToast()


  const checkoutHandler = async (amount) =>{

    const {data:{key}} = await axios.get("https://razorpay-bfjj.onrender.com/api/getkey")

    const {data:{order}}   = await axios.post("https://razorpay-bfjj.onrender.com/api/checkout",{
      amount
    })
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "PS Clothing Store",
      description: orderDetail.id,
      image: logo,
      order_id: order.id,
      callback_url: "https://razorpay-bfjj.onrender.com/api/paymentverification",
      prefill: {
          name: "",
          email: "",
          contact: ""
      },
      notes: {
          address: ""
      },
      theme: {
          color: "#0b31db"
      }
  };
  var razor = new window.Razorpay(options);
 
      razor.open();
  
  }

  // Use the orderId to fetch order details
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`https://psclothing.onrender.com/api/v1/orders/${orderId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Set the orderDetail state with the fetched data
        setOrderDetail(data);
        if(data.status==='Payment done')
        {
          setBtnShow('none')
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
        toast({
          title: "Failed to load",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchData();
  })

  useEffect(()=>{
    const getCount = async () => {
      try {
        const token = localStorage.getItem("psclothing/user/token");
        const response = await axios.get(
          `https://psclothing.onrender.com/api/v1/orders/get/userorders/${orderDetail.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add your token to the Authorization header
            },
          }
        );
  
        setCount(response.data.length);
      } catch (error) {
        console.error("An error occurred:", error);
        // toast({  
        //   title: "An Error Occured",
        //   description: "Please try again later.",
        //   status: "error",
        //   duration: 3000,
        //   isClosable: true,
        // });
      }
    };
    
    getCount();
  })


  return (
    <>
    <Navbar/>
    <Box bg={'white'} p="4" height={'full'}>
      {orderDetail && (
              <Box>
                <Text>Order No.</Text>
                <Text color={"gray"}>
                  Order Date :{" "}
                  {new Date(orderDetail.dateOrdered).toLocaleString()}
                </Text>
                <Flex justifyContent={"space-evenly"} flexDirection={['column','row']}>
                  <Box width={['100%',"70%"]}>
                    <Box width={"100%"} padding={"20px"}>
                      <Flex
                        justifyContent={"space-between"}
                        mb={"10px"}
                        px={"20px"}
                      >
                        <Text
                          fontSize={"20px"}
                          fontWeight={"500"}
                          color={"red"}
                        >
                          Product Details
                        </Text>
                        <Flex gap={"10px"}>
                          <Text
                            paddingY={"5px"}
                            borderRadius={"10px"}
                            bg={"orange"}
                            paddingX={"10px"}
                            fontSize={"16px"}
                            fontWeight={"500"}
                            color={"white"}
                          >
                            Status : {orderDetail.status || "N/A"}
                          </Text>
                          
                        </Flex>
                      </Flex>
                      {orderDetail.orderItems &&
                        orderDetail.orderItems.map((el, i) => {
                          
                          return (
                            <Box
                              py={"15px"}
                              fontSize={"15px"}
                              fontWeight={"500"}
                              bg={"#f5f6f7"}
                              key={i}
                            >
                              <Flex
                                paddingBottom={"18px"}
                                justifyContent={"space-between"}
                                flexDirection={['column','row']}
                              >
                                <Flex
                                  width={"90%"}
                                  justifyContent={"space-evenly"}
                                >
                                  <Box width={"13%"}>
                                    <Image
                                      borderRadius={"10px"}
                                      src={el.product.image}
                                    />
                                  </Box>
                                  <Box width={"75%"}>
                                    <Text>{el.product.name}</Text>
                                    <Text>
                                      Price : &#8377;{el.product.price}.00
                                    </Text>
                                    <Text>Quantity : {el.quantity}</Text>
                                    {/* <Text>{el.product.richDescription}</Text> */}
                                    {el.product.richDescription && (
                                      <Text>
                                        Offer : {el.product.richDescription}
                                      </Text>
                                    )}
                                  </Box>
                                </Flex>
                                <Box>
                                  <Text>Quantity</Text>
                                  <Text>{el.quantity}</Text>
                                </Box>
                                <Box>
                                  <Text>Size</Text>
                                  <Text>{el?.size && el.product && el.size[el.product.id] ? el.size[el.product.id] : 'Not Specified'}</Text>
                                </Box>
                                <Box>
                                  <Text>Total Price</Text>
                                  <Text>
                                    &#8377;{el.quantity * el.product.price}
                                  </Text>
                                </Box>
                                
                              </Flex>
                              <hr />
                            </Box>
                          );
                        })}
                    </Box>
                    <Flex justifyContent={'flex-end'} gap={'20px'} paddingX={"100px"}>
                      {/* <Text
                        paddingX={"20px"}
                        bg={"green"}
                        color={"white"}
                        borderRadius={"10px"}
                        paddingY={"5px"}
                        border={"1px solid gray"}
                        float={"right"}
                        fontSize={"18px"}
                        fontWeight={"500"}
                      >
                        Grand Total : &#8377;{orderDetail.totalPrice}
                      </Text> */}
                      {/* <Button
                        textDecoration={"none"}
                        display={btnShow}
                        bg={"blue"}
                        color={"white"}
                        onClick={()=>checkoutHandler(orderDetail.totalPrice)}
                        justifyContent={'center'}
                        _hover={{bg:'blue',color:'whitesmoke'}}
                      >
                      Make Payment</Button> */}
                    </Flex>
                  </Box>
                  <Box
                    padding={"20px"}
                    color={"gray"}
                    fontSize={"15px"}
                    width={["100%","25%"]}
                  >
                    <Text
                      fontSize={"20px"}
                      fontWeight={"500"}
                      color={"red"}
                      mb={"10px"}
                    >
                      User Details
                    </Text>
                    <Flex alignItems={"center"} gap={"10px"}>
                      <Box width={"15%"}>
                        <Image src={userlogo} />
                      </Box>
                      <Box>
                        <Text>Name : {orderDetail.user?.name || "N/A"}</Text>
                        <Text>Total Orders : {count}</Text>
                      </Box>
                    </Flex>
                    <Box mt={"20px"}>
                      <hr />
                      {/* <Flex alignItems={"center"} py={"10px"} gap={"15px"}>
                        <EmailIcon />
                        <Text> {orderDetail?.email || "N/A"}</Text>
                      </Flex>
                      <hr /> */}
                    </Box>
                    <Box mt={"30px"}>
                      <Text fontSize={"18px"} color={"red"} fontWeight={"500"}>
                        Shipping Address
                      </Text>
                      <Box pl={"20px"}>
                        <Text>{orderDetail.shippingAddress1 || "N/A"}</Text>
                        <Text>{orderDetail.shippingAddress2 || "N/A"}</Text>
                        <Text>
                          {orderDetail.city || "N/A"},{" "}
                          {orderDetail.zip || "N/A"}
                        </Text>
                        <Text>{orderDetail.state || "N/A"}</Text>
                      </Box>
                    </Box>
                    <Text
                        marginTop={'30px'}
                        bg={"green"}
                        color={"white"}
                        borderRadius={"5px"}
                        paddingY={"5px"}
                        border={"1px solid gray"}
                        textAlign={'center'}
                        fontSize={"18px"}
                        fontWeight={"500"}
                      >
                        Grand Total : &#8377;{orderDetail.totalPrice}
                      </Text>
                    <Button
                      marginTop={'20px'}
                      textDecoration={"none"}
                      display={btnShow}
                      width={'100%'}
                      fontSize={'18px'}
                      bg={"blue"}
                      color={"white"}
                      onClick={()=>checkoutHandler(orderDetail.totalPrice)}
                      transition={'all 0.5s ease-in-out'}
                      justifyContent={'center'}
                      _hover={{bg:'#030321',color:'yellow',transform:'scale(1.1)'}}
                    >
                    Make Payment
                    </Button>
                    
                  </Box>
                </Flex>
                
              </Box>
            )}
            <Flex justifyContent={'center'}>
            {/* <Button
              textDecoration={"none"}
              display={btnShow}
              bg={"blue"}
              color={"white"}
              onClick={()=>checkoutHandler(orderDetail.totalPrice)}
              justifyContent={'center'}
              _hover={{bg:'blue',color:'whitesmoke'}}
            >
            Make Payment</Button> */}
            </Flex>
    </Box>
    </>
  );
};

export default CartPage;
