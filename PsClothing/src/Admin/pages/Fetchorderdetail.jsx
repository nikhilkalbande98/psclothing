import {
  Box,
  Image,
  Text,
  Flex,
  Stack,
  VStack,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Select,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AdNavbar from "../../components/AdNavbar";
import Footer from "../../components/Footer";

const FetchOrderDetail = () => {
  const [order, setOrder] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [deliveryBoy, setDeliveryBoy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [orderid, setOrderid] = useState();
  const storedData = localStorage.getItem("userid_fordata");
  const merchantRef = useRef(null);
  const deliveryBoyRef = useRef(null);
  const toast = useToast();
  const data = {
    user_id: storedData,
  };
  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleSubmit = (orderId) => {
    setIsLoading(true);

    // do something with orderId, merchantId, and deliveryBoyId
    orderId.map((el) => setOrderid(el.order_id));

    const selectedMerchant = JSON.parse(merchantRef.current.value);
    const selectedDeliveryBoy = JSON.parse(deliveryBoyRef.current.value);

    const merchant_id = selectedMerchant._id;
    const delivery_person_id = selectedDeliveryBoy._id;
    const order_id = orderid;
    const data = {
      order_id: order_id,
      delivery_person_id: delivery_person_id,
      merchant_id: merchant_id,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "https://www.bloomb.in/order/updateOrder",
        JSON.stringify(data),
        config
      )
      .then((response) => {

        setIsLoading(false);
        toast({
          title: "Success",
          description: "Order has been updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storedData) {
          // Only make the API call if storedData is not null
          const response = await axios.post(
            "https://www.bloomb.in/order/getOrderByUser",
            data
          );
          setOrder(response.data.data);
          console.log(response.data.data);
        } else {
          <Heading>No Data Found</Heading>;
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchData();
  }, [storedData]);
  useEffect(() => {
    async function fetchMerchants() {
      try {
        const response = await axios.post(
          "https://www.bloomb.in/merchants/getMerchant"
        );
        setMerchants(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMerchants();
  }, []);
  useEffect(() => {
    async function fetchDeliveryBoy() {
      try {
        const response = await axios.post(
          "https://www.bloomb.in/delivery/getdeliveryPerson"
        );
        setDeliveryBoy(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDeliveryBoy();
  }, []);

  return (
    <>
      <AdNavbar />
      <Box p={4}>
        <Heading as="h1" size="lg" mb={4} textAlign={"center"}>
          Order Details
        </Heading>
        {order.map((el) => (
          <Box key={el._id} borderRadius="md" shadow="md" p={4} mb={4}>
            <Text fontSize="xl" mb={2}>
              Name: {el.user_id.fullName}
            </Text>
            <Text fontSize="xl" mb={2}>
              City: {el.address_id?.city}
            </Text>
            <Text fontSize="xl" mb={2}>
              State: {el.address_id?.state}
            </Text>
            <Text fontSize="xl" mb={2}>
              Address: {el.address_id?.address}
            </Text>
            <Text fontSize="xl" mb={2}>
              Pin Code: {el.address_id?.pinCode}
            </Text>
            <Text fontSize="xl" mb={2}>
              Total Amount: {el.total_amount}
            </Text>
            <Text fontSize="xl" mb={2}>
              Date Of Order: {new Date(el.updatedAt).toLocaleString()}
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4} mt={4}>
              {el.products.map((p) => (
                <Flex key={p._id} borderRadius="md" shadow="md" p={4}>
                  <Image
                    src={p.product_id?.productImage[0]?.path}
                    alt="Product Image"
                    maxH={{ base: "200px", md: "150px" }}
                    maxW={{ base: "100%", md: "150px" }}
                    objectFit="cover"
                    mr={{ base: 0, md: 4 }}
                  />
                  <VStack align="start" spacing={2}>
                    <Text fontSize="xl">Price: {p.price}</Text>
                    <Text fontSize="xl">Quantity: {p.quantity}</Text>
                    <Button onClick={handleButtonClick}>
                      Update Merchant And Delivery Boy
                    </Button>
                  </VStack>
                </Flex>
              ))}
            </Stack>
          </Box>
        ))}
      </Box>
      <Footer />

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Merchant And Delivery Boy</ModalHeader>
          <ModalBody>
            <Heading>Merchants</Heading>
            <Select ref={merchantRef}>
              {merchants.map((category) => (
                <option key={category._id} value={JSON.stringify(category)}>
                  {category.merchantName}
                </option>
              ))}
            </Select>
            <Heading>Delivery Boy</Heading>
            <Select ref={deliveryBoyRef}>
              {deliveryBoy.map((categor) => (
                <option key={categor._id} value={JSON.stringify(categor)}>
                  {categor.fullName}
                </option>
              ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleCloseModal}>Close</Button>
            <Button onClick={() => handleSubmit(order)} isLoading={isLoading}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FetchOrderDetail;
