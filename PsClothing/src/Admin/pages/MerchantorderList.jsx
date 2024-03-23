import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Icon,
  Text,
  Image,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar";
import backgroundImage from "../../images/backround.jpg";
import Footer from "../../components/Footer";
const MerchantorderList = () => {
  const [orders, setOrders] = useState([]);
  let merchantId = JSON.parse(localStorage.getItem("bloomb/merchant/id"));
  let merchant_name = JSON.parse(localStorage.getItem("bloomb/merchant/login"));
  const data = {
    merchant_id: merchantId,
  };
  useEffect(() => {
    axios
      .post("https://www.bloomb.in/merchants/getOrderByMerchant", data)
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
      });
  }, [orders]);

  return (
    <>
      <AdminNavbar />
      <Box p={4} backgroundImage={`url(${backgroundImage})`}>
        <Box textAlign="center">
          <Heading mb={4}>Hello {merchant_name}</Heading>
        </Box>

        {orders.length > 0 && merchantId ? (
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={4}>
            {orders.map((order) => (
              <Box
                key={order._id}
                boxShadow="base"
                borderRadius="md"
                p={4}
                bg="white"
                bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
              >
                <Heading fontSize="lg">{order.order_id}</Heading>
                <Text mt={2} color="gray.500">
                  Order Date: {new Date(order.updatedAt).toLocaleDateString()}
                </Text>
                <Flex mt={4} flexWrap="wrap">
                  {order.products.map((product) => (
                    <Box
                      key={product._id}
                      flex="1 0 50%"
                      minWidth="120px"
                      mb={4}
                    >
                      <Image
                        src={product.product_id.productImage[0].path}
                        alt={product.product_id.productName}
                        borderRadius="md"
                        h="120px"
                        objectFit="cover"
                        bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
                      />
                      <Text mt={2} fontSize="sm" fontWeight="bold">
                        Price:- {product.price}
                      </Text>
                      <Text mt={1} fontSize="sm" color="gray.500">
                        Description:- {product.product_id.productDescription}
                      </Text>
                    </Box>
                  ))}
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" mt={8}>
            {merchantId ? (
              <>
                <Icon
                  as={FaShoppingCart}
                  boxSize={12}
                  color="gray.300"
                  mb={4}
                />
                <Text fontSize="md" color="gray.500">
                  No orders for {merchant_name}
                </Text>
              </>
            ) : (
              <>
                <Icon as={FaSignInAlt} boxSize={12} color="gray.300" mb={4} />
                <Text fontSize="md" color="gray.500">
                  Please login to view orders
                </Text>
              </>
            )}
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default MerchantorderList;
