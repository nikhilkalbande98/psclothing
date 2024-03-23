import { Box, Heading, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const orderId = localStorage.getItem('psclothing/userorder/id');


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

        if (response.ok) {
          toast({
            title: "Order",
            description: 'Order Status Updated',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
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
    <Box>
      <VStack h={'100vh'} justifyContent={'center'}>
        <Heading textTransform={"uppercase"}>Order Successful</Heading>
        <Text>Ref No: {referenceNum}</Text>
      </VStack>
    </Box>
  );
}

export default PaymentSuccess;
