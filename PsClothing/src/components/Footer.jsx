import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,

} from "@chakra-ui/react";
import { FaInstagram,
  // FaTwitter,
  //  FaYoutube
   } from "react-icons/fa";

import loc from "../images/location.png";
import call from "../images/call.png";
import mail from "../images/mail.png";
import logo from "../images/logo.png";

import { Link, useNavigate } from "react-router-dom";



export default function SmallCentered() {
  const navigate = useNavigate()

  return (
    <Box
      bg={useColorModeValue("#002A53", "gray.900")}
      color={useColorModeValue("white", "gray.200")}
      width={'100%'}
      bottom={0}
      left={0}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Image src={logo} width={"120px"} />
        <Stack direction={"row"}>
          <Flex alignItems={['flex-start',"center"]} flexDirection={['column','row']} gap={"30px"}>
            <Flex
              gap={4}
              borderRight={['none',"2px solid pink"]}
              pr={"20px"}
              height={"100%"}
              alignItems={"center"}
            >
              <Image mt={0} src={loc} height={"30px"} />
              <Text my={0} lineHeight={"23px"}>
                House no. 3120, Panchmukhi Colony,
                <br />
                Shriram College Road, Jabalpur, Pin-482002
              </Text>
            </Flex>
            <Flex
              alignItems={"center"}
              gap={4}
              borderRight={['none',"2px solid pink"]}
              height={"100%"}
              pr={"20px"}
            >
              <Image mt={0} src={call} height={"30px"} />
              <Text my={0}>+91 9981 644 648</Text>
            </Flex>
            <Flex alignItems={"center"} gap={4} height={"100%"}>
              <Image mt={0} src={mail} height={"30px"} />
              <Text my={0}>prachi@psclothing.co.in</Text>
            </Flex>
          </Flex>
        </Stack>
      </Container>
      <Flex justifyContent={"center"} flexDirection={['column','row']}>
        <Link to={'/termsandconditions'}>
        <Button
          bg={"none"}
          textAlign={"center"}
          // onClick={onOpen}
          textColor={"white"}
          transition={'all 0.3s ease-in-out'}
          _hover={{bg:'none',transform:'scale(1.05)'}}
        >
          Terms & Conditions
        </Button>
        </Link>
        <Link to={'/refundandcancellation'}>
        <Button
          bg={"none"}
          textAlign={"center"}
          // onClick={onOpen}
          textColor={"white"}
          transition={'all 0.3s ease-in-out'}
          _hover={{bg:'none',transform:'scale(1.05)'}}
        >
          Refund and Cancellation
        </Button>
        </Link>
        <Link to={'/shippingpolicy'}>
        <Button
          bg={"none"}
          textAlign={"center"}
          // onClick={onOpen}
          textColor={"white"}
          transition={'all 0.3s ease-in-out'}
          _hover={{bg:'none',transform:'scale(1.05)'}}
        >
          Shipping Policy
        </Button>
        </Link>
        <Link to={'/privacypolicy'}>
        <Button
          bg={"none"}
          textAlign={"center"}
          // onClick={onOpen}
          textColor={"white"}
          transition={'all 0.3s ease-in-out'}
          _hover={{bg:'none',transform:'scale(1.05)'}}
        >
          Privacy Policy
        </Button>
        </Link>
        <Link to={'/contactus'}>
        <Button
          bg={"none"}
          textAlign={"center"}
          // onClick={onOpen}
          textColor={"white"}
          transition={'all 0.3s ease-in-out'}
          _hover={{bg:'none',transform:'scale(1.05)'}}
        >
          Contact Us
        </Button>
        </Link>
        
      </Flex>
      
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text> All rights are reserved by <span style={{color:'yellow'}}>PsClothing</span> & desinged by <span style={{color:'yellow'}}>Skynet Corporation</span></Text>
          <Stack direction={"row"} spacing={6}>
            {/* <a
              style={{
                border: "1px solid white",
                padding: "8px",
                borderRadius: "50%",
              }}
              href={"#"}
            >
              <FaTwitter />
            </a>
            <a
              style={{
                border: "1px solid white",
                padding: "8px",
                borderRadius: "50%",
              }}
              label={"YouTube"}
              href={"#"}
            >
              <FaYoutube />
            </a> */}
            <a
              style={{
                border: "1px solid white",
                padding: "8px",
                borderRadius: "50%",
              }}
              label={"Instagram"}
              href={"https://instagram.com/ps.clothing_15?igshid=MTJ3bXlkOTR4cWE2MA=="}
            >
              <FaInstagram />
            </a>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
