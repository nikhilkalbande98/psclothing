import { Box, Button, Flex, Grid, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import onepiece from "../images/5.png"
import top from "../images/10.png"
import kurti from "../images/13.png"

const Categories = () => {
  return (
    <>
        <Box width="100%" px={['0.5rem', '1rem']} mt={['0.5rem', '3rem']} pb={['10px', '30px']}>
        <Text fontSize={'32px'} color={'red'} fontWeight={'500'} textAlign={'center'}>Find What You Need</Text>
        <Flex gap={4} justifyContent={'space-between'} width={"70%"} margin={'auto'}>
          <Box p={['0.5rem', '1rem']} bg="white" borderRadius={5}>
            <VStack>
              <Text fontSize={['1rem', '1.5rem']} fontWeight="bold" fontFamily="calibri">
                Western One Piece Dress
              </Text>
              <Image src={onepiece} width="100%" />
              <Link color="blue" _hover={{ color: 'orange.500' }}>
                See More
              </Link>
            </VStack>
          </Box>
          <Box p={['0.5rem', '1rem']} bg="white" borderRadius={5}>
            <VStack>
              <Text fontSize={['1rem', '1.5rem']} fontWeight="bold" fontFamily="calibri">
                Wester Top Collections
              </Text>
              <Image src={top} width="100%" />
              <Link color="blue" _hover={{ color: 'orange.500' }}>See More</Link>
            </VStack>
          </Box>
          <Box p={['0.5rem', '1rem']} bg="white" borderRadius={5}>
            <VStack>
              <Text fontSize={['1rem', '1.5rem']} fontWeight="bold" fontFamily="calibri">
                Designer Kurta Sets
              </Text>
              <Box>
                <Image src={kurti} />
              </Box>
              <Link color="blue" _hover={{ color: 'orange.500' }}>See More</Link>
            </VStack>
          </Box>
          {/* <Box>
            <Grid templateColumns={['1fr', '1fr', '1fr', '1fr']} gap={['4', '4', '4', '4']}>
              <Box p={['0.5rem', '1rem']} bg="white" borderRadius={5}>
                <Text fontSize={['1rem', '1.5rem']} fontWeight="bold" fontFamily="calibri">
                  Sign in for your best experience
                </Text>
                <Button bg="yellow" _hover={{ bg: 'orange' }} width="100%">
                  See More
                </Button>
              </Box>
              <Box pl={['0.5rem', '0.5rem']}>
                <Link>
                  <Image src="https://m.media-amazon.com/images/G/31/img19/AMS/Houseads/Laptops-Sept2019._CB436595915_.jpg" />
                </Link>
              </Box>
            </Grid>
          </Box> */}
        </Flex>
      </Box>
    </>
  )
}

export default Categories
