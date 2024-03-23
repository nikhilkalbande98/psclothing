import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Button,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import userlogo from "../images/user.png"
import { useNavigate, useSearchParams } from 'react-router-dom';

const Cart = () => {
  const userId = localStorage.getItem('psclothing/user/id');
  // const userMail = localStorage.getItem('psclothing/user/email');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderDetail, setOrderDetail] = useState(null);
  const [orders, setOrders] = useState([]);
  const toast = useToast()
  // const [user, setUser] = useState();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;
  const navigate = useNavigate();
  const orderId = localStorage.getItem('psclothing/userorder/id');


  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");

 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // console.error("Error fetching data:", error);
    toast({
      title: "Failed to load",
      description: "Please try again later.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    // Handle the error, show a message to the user, or perform appropriate actions.
    return null; // Return null or an empty object in case of an error.
  }
};

const getCount = async () => {
  try {
    const token = localStorage.getItem("psclothing/user/token");
    const response = await axios.get(
      `https://psclothing.onrender.com/api/v1/orders/get/userorders/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCount(response.data.length);
  } catch (error) {
    // console.error("An error occurred:", error);
    toast({
      title: "An Error Occured",
      description: "Please try again later.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    // Handle the error, show a message to the user, or perform appropriate actions.
  }
};

const handleClick = (orderId) => {
  
  fetchData(`https://psclothing.onrender.com/api/v1/orders/${orderId}`).then((data) => {
    if (data) {
      setOrderDetail(data);
      localStorage.setItem('psclothing/userorder/id', orderId);
      navigate(`/cartpage/${orderId}`);
    }
  });

  getCount();
};

useEffect(() => {
  fetchData('https://psclothing.onrender.com/api/v1/orders').then((data) => {
    
    if (data) {
      setOrders(data);
    }
  });
}, []);

// console.log(orderDetail);

const userOrders = orders.filter((order) => order.user.id === userId);
const indexOfLastOrder = currentPage * ordersPerPage;
const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
const currentOrders = userOrders.slice(indexOfFirstOrder, indexOfLastOrder);

const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <>
      <Navbar />
      <Box bg={'white'} p="4">
        <VStack align="stretch" spacing="4">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>Shipping Address</Th>
                <Th>Items</Th>
                <Th>Total Price</Th>
                <Th>Order Date</Th>
                <Th>Order Status</Th>
                
              </Tr>
            </Thead>
            <Tbody>
              {currentOrders.map((order) => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>
                    {order.shippingAddress1}, {order.shippingAddress2}, {order.city}, {order.state}, {order.zip}
                  </Td>
                  <Td>{order.orderItems.length}</Td>
                  <Td>&#8377; {order.totalPrice}</Td>
                  <Td>{new Date(order.dateOrdered).toLocaleString()}</Td>
                  
                  <Td textAlign={"center"}>
                    <Text>{order.status}</Text>
                    <Button
                      textDecoration={"none"}
                      bg={"none"}
                      color={"red"}
                      onClick={() => handleClick(order._id)}
                    >
                      View More
                    </Button>
                    
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <div className="pagination">
            {userOrders.length > ordersPerPage && (
              <Button
                onClick={() => paginate(currentPage - 1)}
                isDisabled={currentPage === 1}
              >
                Previous
              </Button>
            )}
            {userOrders.length > ordersPerPage && (
              <Button
                onClick={() => paginate(currentPage + 1)}
                isDisabled={indexOfLastOrder >= userOrders.length}
              >
                Next
              </Button>
            )}
          </div>
        </VStack>
      </Box>
      
      <Footer />
    </>
  );
};

export default Cart;
