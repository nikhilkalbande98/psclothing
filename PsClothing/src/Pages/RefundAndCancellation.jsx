import { Box, Heading, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import { MdCheckCircle, MdSettings } from 'react-icons/md'

const RefundAndCancellation = () => {
  return (
    <div>
      <Box p={4} mx="auto">
              <Heading as="h2" fontSize="2xl" textAlign="center" mb={4}>
                Return / Exchange and Refund Policy
              </Heading>
              <Text mb={4}>
                You can exchange and return the order within 5 days of delivery
                of the product. To exchange, please email us at{" "}
                <a
                  style={{ color: "blue" }}
                  href="mailto:prachi@psclothing.co.in"
                >
                  prachi@psclothing.co.in
                </a>
                .
              </Text>
              <Text fontWeight="bold" mb={2}>
                We welcome exchange on the following terms:
              </Text>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  If a wrong product or size has been received.
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Manufacturing defect on the received product.
                </ListItem>
              </List>
              <Text fontWeight="bold" mt={4}>
                Refund:
              </Text>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  All refunds will be processed after the quality check of the
                  received items within 7-10 business days of receiving the
                  merchandise back at our warehouse.
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  If the product fails to meet our quality check, it will be
                  notified to the customer and sent back directly.
                </ListItem>
              </List>
              <Text mt={4} fontWeight="bold">
                Note:
              </Text>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  No COD on any product.
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Opening video is a must for all the products, whether they are
                  to be returned or refunded.
                </ListItem>
              </List>
              <Text mt={4} fontWeight="bold">
                Important:
              </Text>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdSettings} color="green.500" />
                  Any damage to the product will not be accepted for refund or
                  exchange.
                </ListItem>
              </List>
              </Box>
    </div>
  )
}

export default RefundAndCancellation
