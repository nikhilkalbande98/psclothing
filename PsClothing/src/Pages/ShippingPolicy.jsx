import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ShippingPolicy = () => {
  return (
    <Box p={4} mx="auto">
      <Box maxW="800px" mx="auto" p="4">
      <Heading mb="4">Shipping Information: Fast, Reliable, On Your Terms</Heading>
      <Text>At our Company, we understand the excitement of receiving your order promptly. Our commitment is to ensure your items reach you as quickly and efficiently as possible. Here's what you need to know about our shipping times:</Text>
      <Box borderWidth="1px" borderRadius="lg" p="4" mb="4">
        <Heading as="h2" size="md" mb="2">Standard Shipping: 7-10 days</Heading>
        <Text>
        Enjoy reliable delivery within 7-10 days with our standard shipping option. This is our most cost-effective choice for customers who prioritize savings without compromising on service. Perfect for those who plan their orders ahead.
        </Text>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" p="4" mb="4">
        <Heading as="h2" size="md" mb="2">Same day Delivery : Available in nearby area</Heading>
        <Text>
        For select locations, we offer same-day delivery! Place your order before 01.00pm and experience the convenience of having your items arrive on your doorstep the same day. Because exceptional service is sometimes as quick as a single day.
        </Text>
      </Box>
      <Text>
      Your satisfaction is our priority, and we're here to assist you every step of the way. If you have any questions or concerns about your order, our customer support team is ready to help.</Text>
    <Text>
        Thank you for choosing [Your Company]. We look forward to delivering happiness to your door!
      </Text>
      <Link to={'/'}>
      <Button colorScheme="teal" size="lg" mt="4">Shop Now!</Button>
      </Link>
    </Box>
    </Box>
  )
}

export default ShippingPolicy
