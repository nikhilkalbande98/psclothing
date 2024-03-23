import {
  Box,
  Image,
  Text,
  Flex,
  Button,
  Grid,
  GridItem,
  background,
  color,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../images/backround.jpg";
import loading from "../images/loading.gif";
const Card = ({ imageSrc, title, description, categoryId }) => {
  const handleExploreMoreClick = ({ categoryId }) => {
    localStorage.setItem("categoryId", categoryId);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="box-shadow 0.2s ease-in-out"
      _hover={{
        boxShadow: "xl",
      }}
      width="85%"
      margin="0 auto"
      mb="6"
      bg="#F0FAF9"
    >
      <Image src={imageSrc} alt={title} height="240px" width="100%" />
      <Box p="6">
        <Text
          fontWeight="bold"
          fontSize="xl"
          mb="2"
          textTransform="uppercase"
          textAlign="center"
          color=" rgb(28, 28, 41)"
        >
          {title}
        </Text>
        <Text fontSize="md" color="gray.500" textAlign="center">
          {description}
        </Text>
        <Link to={"/product"}>
          <Button
            mt="4"
            // colorScheme="teal"
            // variant="outline"
            _hover={{ bg: " rgb(28, 28, 41)" }}
            w="100%"
            size="sm"
            bg=" rgb(28, 28, 41)"
            color="white"
            onClick={() => handleExploreMoreClick({ categoryId })}
          >
            Explore More
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

const Data = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .post("https://www.bloomb.in/categorys/getCategory")
      .then((response) => {
        console.log(response.data.data);
        const mixCategory = response.data.data.find(
          (category) => category.categoryName === "Mix"
          // console.log(category)
        );
        const harrCategory = response.data.data.find(
          (category) => category.categoryName === "Haar"
        );
        const BouquetCategory = response.data.data.find(
          (category) => category.categoryName === "Bouquet"
        );
        const RosesCategory = response.data.data.find(
          (category) => category.categoryName === "Roses"
        );
        const GajraCategory = response.data.data.find(
          (category) => category.categoryName === "Gajra"
        );
        const PackageCategory = response.data.data.find(
          (category) => category.categoryName === "Packages"
        );
        const otherCategories = response.data.data.filter(
          (category) =>
            category.categoryName !== "Mix" &&
            category.categoryName !== "Haar" &&
            category.categoryName !== "Bouquet" &&
            category.categoryName !== "Roses" &&
            category.categoryName !== "Bouquet" &&
            category.categoryName !== "Gajra" &&
            category.categoryName !== "Packages"
        );
        const rearrangedCategories = [
          mixCategory,
          harrCategory,
          BouquetCategory,
          RosesCategory,
          GajraCategory,

          ...otherCategories,
        ];
        setCategories(rearrangedCategories);
        setIsLoading(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return (
      <Box
        p="6"
        minHeight="100vh"
        backgroundImage={`url(${loading})`}
        backgroundRepeat="no-repeat"
      ></Box>
    );
  }

  return (
    <Box p="6" minHeight="100vh" >
      <Box textAlign="center">
        <Box textAlign="center">
          <Box
            borderBottom="2px"
            borderColor="teal.500"
            mb="2"
            w="50%"
            mx="auto"
          >
            <Text
              fontWeight="bold"
              fontSize="3xl"
              textTransform="capitalize"
              color=" rgb(28, 28, 41)"
            >
              BloomB
            </Text>
          </Box>
        </Box>
        <Box display="inline-block" borderBottom="4px solid #38B2AC"></Box>
        <Box mx="auto" textAlign="center" mt="4">
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color=" rgb(28, 28, 41)"
            maxW={{ base: "90%", md: "55%", lg: "85%" }}
            mx="auto"
          >
            BloomB platform has been established to provide the fresh Flowers on
            a daily basis for our Homes and our working places. The motive is to
            make fresh Flower delivery a daily requirement like others in our
            lives, both personal & Professional. Initially It will be Nagpur
            centric and later on will be expended to Pan India. It has another
            purpose to provide Flower merchants and growers a vast market with
            direct customer connection. We have also taken the eco-friendly
            delivery & also Flowers will be provided in eco-friendly
            bio-degradable bags. Customers can put their demand initially for
            restricted time lines, which will be extended later on. So Enjoy the
            services of fresh flowers in your daily life without any hassle at
            your doorstep. Bring it to be a part of happiness of your loved
            ones. We give quality fragrant flowers and bouquets to our
            customers. Our retail premises opened in 2023 in Nagpur city.
          </Text>
        </Box>
      </Box>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap="6"
        mt="6"
      >
        {categories.map((category) => (
          <GridItem key={category._id}>
            <Card
              title={category.categoryName}
              imageSrc={category.categoryImage[0].path}
              description={category.description}
              categoryId={category._id}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Data;
