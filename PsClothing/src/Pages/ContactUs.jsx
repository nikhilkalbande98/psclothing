import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const ContactUs = () => {
  return (
    <div>
      <Box p={8}>
      <Heading mb={4}>Contact Us</Heading>
      <VStack align="start" spacing={4}>
        <Text>Email: <Link href="mailto:prachi@psclothing.co.in">prachi@psclothing.co.in</Link></Text>
        <Text>Phone: <Link href="tel:+919981644648">+91 9981 644 648</Link></Text>
        <Text>Address: House no. 3120, Panchmukhi Colony, Shriram College Road, Jabalpur, Pin-482002</Text>
      </VStack>
    </Box>
    </div>
  )
}

export default ContactUs
