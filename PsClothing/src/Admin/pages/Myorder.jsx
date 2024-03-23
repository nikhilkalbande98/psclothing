import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState, memo } from "react";
import { FaShoppingCart } from "react-icons/fa";
import userlogo from "../../images/user.png";
import { CheckIcon, EmailIcon } from "@chakra-ui/icons";

const MyOrder = () => {
  
  
  const [orders, setOrders] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderDetail, setOrderDetail] = useState(null); // Changed to null
  const [user, setUser] = useState(); // Changed to null
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("psclothing/admin/token");

  const options = ["Received", "Packed", "Shipped", "Delivered", "Cancelled"];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const [selectedOption, setSelectedOption] = useState("");
  const toast = useToast();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleStatusChange = async (orderId) => {
    try {
      // Check if the selected option is "Change Status"
      if (selectedOption === "") {
        // Display an error toast and return early
        toast({
          title: 'Error',
          description: 'Please select a valid status',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        return;
      }
  
      const token = localStorage.getItem('psclothing/admin/token');
  
      const response = await fetch(`https://psclothing.onrender.com/api/v1/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: selectedOption,
        }),
      });
  
      if (response.ok) {
        toast({
          title: "Order " + selectedOption,
          description: 'Order Status Updated',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        handleClick(orderId, orderDetail.user.id);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update order status',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  


  const handleClick = (order_id, user_id) => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://psclothing.onrender.com/api/v1/orders/${order_id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrderDetail(data);

        onOpen();
        fetchUser(user_id); // Moved the fetchUser call inside fetchData
      } catch (error) {
        toast({
          title: "Error fetching Data",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchData();

    const fetchUser = async (user_id) => {
      if (!user_id) {
        toast({
          title: "Error",
          description: "Cannot find the user",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      try {
        const token = localStorage.getItem("psclothing/admin/token");
        const response = await fetch(
          `https://psclothing.onrender.com/api/v1/users/${user_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          toast({
            title: "Error",
            description: "An error occurred. Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    const getCount = async () => {
      try {
        const response = await axios.get(
          `https://psclothing.onrender.com/api/v1/orders/get/userorders/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add your token to the Authorization header
            },
          }
        );

        setCount(response.data.length);
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    getCount();
  };

  useEffect(() => {
    axios.get("https://psclothing.onrender.com/api/v1/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <Box p={[0, 4, 6]} boxShadow="lg" borderRadius="md">
      <Heading as="h2" size="md" mb={4}>
        <Icon as={FaShoppingCart} mr={2} />
        My Orders
      </Heading>
      <Box bg={"white"} p="4" height={"full"}>
        <VStack align="stretch" spacing="2">
          <Table variant="simple">
            <Thead>
              <Tr>
                {/* <Th>Order ID</Th> */}
                <Th fontSize={['11px','12px']}>Shipping Details</Th>
                <Th>Items</Th>
                <Th>Total Price</Th>
                <Th>Order Date</Th>
                <Th fontSize={['11px','12px']}>Order Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((order) => (
                <Tr key={order._id}>
                  {/* <Td>{order._id}</Td> */}
                  <Td fontSize={['13px','15px']}>
                    <Text color={'red'}>{order._id}</Text>
                    <br />
                    {/* {order.shippingAddress1}, {order.shippingAddress2},{" "} */}
                    {order.city}, {order.state}, {order.zip}
                    <br />
                    <Text fontWeight={"500"}>{order.phone}</Text>
                  </Td>
                  <Td>{order.orderItems.length}</Td>
                  <Td>{order.totalPrice}</Td>
                  <Td>{new Date(order.dateOrdered).toLocaleString()}</Td>
                  <Td textAlign={"left"}>
                    <Text fontSize={['14px','15px']} textAlign={'left'}>{order.status}</Text>
                    <Button
                      textDecoration={"none"}
                      bg={"none"}
                      textAlign={'left'}
                      color={"red"}
                      margin={'0px'}
                      padding={'0px'}
                      width={'fit-content'}
                      fontSize={['13px','16px']}
                      onClick={() => handleClick(order._id, order.user.id)}
                    >
                      View More
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              bg={'none'}
            >
              Previous
            </Button>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={indexOfLastItem >= orders.length}
              bg={'none'}
            >
              Next
            </Button>
          </Table>
        </VStack>
      </Box>
      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {orderDetail && (
              <Box>
                <Text>Order No.</Text>
                <Text color={"gray"}>
                  Order Date :{" "}
                  {new Date(orderDetail.dateOrdered).toLocaleString()}
                </Text>
                <Flex justifyContent={"space-evenly"} flexDirection={['column','row']}>
                  <Box width={["100%","70%"]}>
                    <Box width={"100%"} padding={"20px"}>
                      <Flex
                        justifyContent={"space-between"}
                        mb={"10px"}
                        px={"20px"}
                        flexDirection={['column','row']}
                      >
                        <Text
                          fontSize={"20px"}
                          fontWeight={"500"}
                          color={"red"}
                        >
                          Product Details
                        </Text>
                        <Flex gap={"10px"} flexDirection={['column','row']}>
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
                          <Box>
                          <Select
                            placeholder="Change Status"
                            onChange={handleSelectChange}
                            border={'2px solid #1340d4'}
                            value={selectedOption}
                          >
                            {options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Select>
                          </Box>
                          <Button
                            bg={'red'}
                            color={'white'}
                            onClick={()=>handleStatusChange(orderDetail.id)}
                          >
                            Save
                          </Button>
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
                              >
                                <Flex
                                  width={"70%"}
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
                                    <Text>Size : {el?.size && el.product && el.size[el.product.id] ? el.size[el.product.id] : 'Not Specified'}</Text>
                                    
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
                                  <Text>Total Price</Text>
                                  <Text>
                                    &#8377;{el.quantity * el.product.price}
                                  </Text>
                                </Box>
                                <Box></Box>
                              </Flex>
                              <hr />
                            </Box>
                          );
                        })}
                    </Box>
                    <Box paddingX={["0px","100px"]}>
                      <Text
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
                      </Text>
                    </Box>
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
                        <Text>Name : {user?.name || "N/A"}</Text>
                        <Text>Total Orders : {count}</Text>
                      </Box>
                    </Flex>
                    <Box mt={"20px"}>
                      <hr />
                      <Flex alignItems={"center"} py={"10px"} gap={"15px"}>
                        <EmailIcon />
                        <Text> {user?.email || "N/A"}</Text>
                      </Flex>
                      <hr />
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
                    {/* <Box mt={"30px"}>
                      <Text color={'red'} fontSize={'18px'} fontWeight={'500'}>Payment Mode : </Text>
                    </Box> */}
                  </Box>
                </Flex>
                
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default memo(MyOrder);
