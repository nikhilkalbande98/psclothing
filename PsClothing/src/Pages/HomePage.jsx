import {React,memo, useEffect} from "react";


import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Text, useToast } from "@chakra-ui/react";
import ProductsList from "../components/ProductsList";
import Dashboard from "../Admin/Admin";
import Banner from "../components/Carousel";
import { useNavigate, useSearchParams } from "react-router-dom";


const HomePage = () => {
  
  const token = localStorage.getItem("psclothing/admin/token");
  const navigate = useNavigate();
  const orderId = localStorage.getItem('psclothing/userorder/id');
  const toast = useToast()
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");

  useEffect(() => {
    const updateOrderStatus = async () => {
      try {
        // Check if the selected option is "Change Status"
        const token = localStorage.getItem('psclothing/user/token');
        const response = await fetch(`https://psclothing.onrender.com/api/v1/orders/${orderId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "Payment done",
          }),
        });
        
        if(referenceNum!=null)
        {
  
          if (response.ok) {
            window.location.reload();
            toast({
              title: "Order Successfull",
              description: `Ref-id : ${referenceNum}`,
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: 'Error',
              description: 'Failed to update order status',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update order status',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      
      const redirectTimer = setTimeout(() => {
        navigate('/'); // Redirect to the homepage
      }, 3000);
  
      return () => {
        clearTimeout(redirectTimer);
      };
    };
  
    updateOrderStatus();
  }, [navigate, orderId, toast]);

  return (
    <>{
      token?(<Dashboard/>):(
        <Box bg={'white'}>
        <Navbar />

        <Banner/>
        {/* <Data /> */}

        <ProductsList/>
        
        {/* <Categories/> */}

        {/* <Sliderr /> */}
        <Footer />
      </Box>
      )
    }
      
    </>
  );
};

export default memo(HomePage);
