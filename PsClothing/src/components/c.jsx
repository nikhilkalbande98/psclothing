import { useState, useEffect } from "react";
import { Box, Text, Image, Button, Select } from "@chakra-ui/react";
import axios from "axios";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const user_id = localStorage.getItem("bloomb/user/id").replace(/"/g, "");

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("bloomb/user/login"),
    };
    // Fetch cart data from API
    axios
      .post(
        "https://www.bloomb.in/userCart/getUserCart",
        { user_id },
        { headers }
      )
      .then((response) => setCartData(response.data.data.products))
      .catch((error) => console.error(error));
  }, []);
  const handleQuantityChange = (productId, quantity) => {
    // Update quantity for product in cart data
    const updatedCartData = cartData.map((item) => {
      if (item._id === productId) {
        item.quantity = quantity;
      }
      return item;
    });

    setCartData(updatedCartData);
  };

  useEffect(() => {
    // Calculate total price
    const totalPrice = cartData.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    setTotalPrice(totalPrice);
  }, [cartData]);
  console.log(cartData);
  return (
    <Box>
      {cartData.map((item) => (
        <Box
          key={item.productId}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="4"
        >
          <Image
            src={item.product_id.productImage[0].path}
            alt={""}
            w="200px"
            h="200px"
            objectFit="cover"
            mr="4"
          />
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              {item.product_id.productName}
            </Text>
            <Text fontSize="lg" mt="2">
              {item.price} IN
            </Text>
            <Select
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item._id, e.target.value)}
            >
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Select>
            <Text fontSize="lg" mt="2">
              {item.price * item.quantity} USD
            </Text>
          </Box>
        </Box>
      ))}
      <Box mt="4">
        <Text fontSize="xl" fontWeight="bold">
          Total Price: {totalPrice} USD
        </Text>
        <Button colorScheme="blue" mt="4">
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
