import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Skeleton,
  Button,
  Icon,
  Heading,
  Grid,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import backgroundImage from "../images/backround.jpg";

const fetchProduct = async (categoryId) => {
  try {
    const response = await axios.post(
      "https://www.bloomb.in/products/getProductByCategory",
      { categoryId }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const ProductCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const toast = useToast();
  const categoryId = localStorage.getItem("categoryId");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchProduct(categoryId);
      setProducts(data);
      setIsLoading(false);
    };

    fetchData();
  }, [categoryId]);
  const handleAddToCart = (product) => {
    // console.log(product);
    // Check if user is logged in
    const token = localStorage.getItem("psclothing/user/login");
    const user_id = JSON.parse(localStorage.getItem("psclothing/user/id"));

    if (!token || !user_id) {
      // Redirect user to login page or display a message
      return toast({
        title: "Please Login first ",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      const data = {
        user_id: user_id,
        products: [
          {
            product_id: product._id,
            price: product.price,
            quantity: 1,
          },
        ],
      };

      axios
        .post("https://www.bloomb.in/userCart/addToCart", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {

          // Display toast notification on success
          toast({
            title: "Product added to cart",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((error) => {
          // Display toast notification on error

          toast({
            title: "Error adding product to cart",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    }
  };

  if (!Array.isArray(products.data) || !products.data) {
    return (
      <>
        <Navbar />
        <Box
          maxW="100%"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={8}
          textAlign="center"
        >
          <Icon as={FaShoppingCart} w={8} h={8} mx="auto" mb={4} />
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            No products found in this category
          </Text>
        </Box>
        <Footer />
      </>
    );
  } else if (isLoading) {
    return (
      <>
        <Navbar />
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ base: 4, md: 8 }}
        >
          {[...Array(6)].map((_, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
            >
              <Skeleton height="200px" />
              <Box p="6">
                <Skeleton height="20px" width="40%" mb="2" />
                <Skeleton height="16px" width="20%" />
              </Box>
            </Box>
          ))}
        </Grid>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar />

        <Box
          maxW="100%"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={8}
          backgroundImage={`url(${backgroundImage})`}
        >
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: 4, md: 8 }}
          >
            {products.data &&
              products.data.map((product) => (
                <Box
                  key={product._id}
                  border="1px solid gray"
                  borderRadius={4}
                  p={4}
                  boxShadow={{ md: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}
                  _hover={{ transform: "scale(1.05)" }}
                  transition="all 0.3s ease-in-out"
                  position="relative"
                >
                  <Box
                    mb={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src={product.productImage[0].path}
                      alt={product.productName}
                      // boxSize={{ base: "100%", md: "80%" }}
                      objectFit="contain"
                      h="250px"
                      w="250px"
                    />
                  </Box>
                  <Box textAlign="center">
                    <Heading as="h2" size="md" mb={2}>
                      {product.productName}
                    </Heading>
                    <Text fontWeight="bold" mb={2} color={" rgb(28, 28, 41)"}>
                      Price: Rs. {product.price}
                    </Text>
                    <Text mb={2}>{product.productDescription}</Text>
                    {/* <Text mb={4}>Quantity: {product.productQuantity}</Text> */}
                    <Button
                      bg={" rgb(28, 28, 41)"}
                      onClick={() => handleAddToCart(product)}
                      fontWeight="bold"
                      borderRadius="md"
                      color={"white"}
                      _hover={{ boxShadow: "lg" }}
                    >
                      Add to cart
                    </Button>
                  </Box>
                </Box>
              ))}
          </Grid>
        </Box>
        <Footer />
      </>
    );
  }
};

export default ProductCard;
