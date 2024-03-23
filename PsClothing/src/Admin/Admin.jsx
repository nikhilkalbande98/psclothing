import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Stack,
} from "@chakra-ui/react";
import {
  FaShoppingCart,
  FaUsers,
  FaProductHunt,
  FaAd,
  FaCaretUp,
  FaBacterium,
  FaDeaf,
} from "react-icons/fa";
import Merchants from "./Mercent";

import Myorder from "./pages/Myorder";
import UsersPage from "./pages/UsersPage";
import ProductsPages from "./pages/ProductsPages";
import AddProductPage from "./pages/AddProductPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import AddBannerPage from "./pages/AddBannerPage";
import AddPackages from "./pages/AddPackages";

import Footer from "../components/Footer";

import AdminNavbar from "../components/AdminNavbar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("myOrders");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "myOrders":
        return <Myorder />;
      case "merchants":
        return <Merchants />;
      case "users":
        return <UsersPage />;
      case "products":
        return <ProductsPages />;
      case "addproducts":
        return <AddProductPage />;
      case "addcategory":
        return <AddCategoryPage />;
      case "addbanner":
        return <AddBannerPage />;
      case "addpacakages":
        return <AddPackages />;
      default:
        return null;
    }
  };

  return (
    <>
      <AdminNavbar />
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        flexWrap={{ md: "nowrap" }}
        justifyContent={{ md: "space-between" }}
        // backgroundImage={`url(${backgroundImage})`}
        bg={'gray.200'}
      >
        <Box p={6} width={{ base: "100%", md: "25%" }}>
          <Stack>
            <Button
              leftIcon={<Icon as={FaShoppingCart} />}
              colorScheme={activeTab === "myOrders" ? "blue" : "gray"}
              onClick={() => handleTabClick("myOrders")}
              width="100%"
            >
              My Orders
            </Button>
            {/* <Button
              leftIcon={<Icon as={FaStore} />}
              colorScheme={activeTab === "merchants" ? "blue" : "gray"}
              onClick={() => handleTabClick("merchants")}
              width="100%"
            >
              Merchants
            </Button> */}
            <Button
              leftIcon={<Icon as={FaUsers} />}
              colorScheme={activeTab === "users" ? "blue" : "gray"}
              onClick={() => handleTabClick("users")}
              width="100%"
            >
              Users
            </Button>
            <Button
              leftIcon={<Icon as={FaProductHunt} />}
              colorScheme={activeTab === "products" ? "blue" : "gray"}
              onClick={() => handleTabClick("products")}
              width="100%"
            >
              Products
            </Button>
            <Button
              leftIcon={<Icon as={FaAd} />}
              colorScheme={activeTab === "addproducts" ? "blue" : "gray"}
              onClick={() => handleTabClick("addproducts")}
              width="100%"
            >
              Add Products
            </Button>
            <Button
              leftIcon={<Icon as={FaCaretUp} />}
              colorScheme={activeTab === "addcategory" ? "blue" : "gray"}
              onClick={() => handleTabClick("addcategory")}
              width="100%"
            >
              Add Category
            </Button>
            <Button
              leftIcon={<Icon as={FaBacterium} />}
              colorScheme={activeTab === "addbanner" ? "blue" : "gray"}
              onClick={() => handleTabClick("addbanner")}
              width="100%"
            >
              Add Banner
            </Button>
            <Button
              leftIcon={<Icon as={FaDeaf} />}
              colorScheme={activeTab === "addpacakages" ? "blue" : "gray"}
              onClick={() => handleTabClick("addpacakages")}
              width="100%"
            >
              Add Pacakages
            </Button>
          </Stack>
        </Box>
        <Box p={6} width={{ base: "100%", md: "75%" }}>
          {renderTabContent()}
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default Dashboard;
