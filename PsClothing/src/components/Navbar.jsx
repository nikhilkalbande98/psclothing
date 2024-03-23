import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
 
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import UserLogin from "./UserLogin";
// import UserLogin from "./UserRegistration";

const Navbar = () => {

  // const toast = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [adminbtn,setAdminbtn] = useState('block')
  const token = localStorage.getItem('psclothing/user/token'); // Replace with your token storage mechanism
  useEffect(() => {
    // Check if the user is already logged in (e.g., by checking a token in localStorage)
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = useState('inside')
  const btnRef = useRef(null)
  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const handleToggle = () => setShow(!show);
  const user = localStorage.getItem("psclothing/user/token");

  const handleLogout = () => {
    localStorage.removeItem("psclothing/user/token")
    localStorage.clear()
    setIsLoggedOut(true); // set isLoggedOut to true when the user logs out
    navigate('/')
    window.location.reload()
  };
  return (
    <Box display={['flex','block']} gap={['20px','0']} bg="#041329" px={4} boxShadow="md" p={5} top={0} left={0} width={'100%'} zIndex={'999'}>
      <Link to={"/"}>
          <Box width={'140px'} display={['block','none']}>
            <Image src={Logo} alt="Logo" width={"100%"} />
          </Box>
        </Link>
      <Flex h={16} alignItems={"center"} flexDirection={['column','row']} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={<HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={handleToggle}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Link to={"/"}>
            <Image display={['none','block']} src={Logo} alt="Logo" width={"140px"} />
          </Link>
          <HStack
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
            <Link to='/'>
              <Button bg={'none'} transition={'all 0.5s ease-in-out'} color={'white'} _hover={{bg:'none',color:'red', transform:'scale(1.1)'}} fontSize={'18px'}>Home</Button>
            </Link>
          </HStack>
        </HStack>
        
        <Box
          display={['none',"flex"]}
          width="40%"
          boxShadow="0 1px 2px rgba(0, 0, 0, 0.1)"
          borderRadius="4px"
          overflow="hidden"
        >
          <Input
            placeholder="Search"
            flex="1"
            border="none"
            borderRadius="4px 0 0 4px"
            focusBorderColor="none"
            _focus={{ boxShadow: 'none' }}
            bg={'white'}
          />
          <Box
            width="8%"
            bg="#FF9900"
            borderRadius="0 4px 4px 0"
            cursor="pointer"
            _hover={{ background: '#FFB366' }}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Center>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Center>
          </Box>
        </Box>
        
        <Flex alignItems={"center"} flexDirection={['column','row']} gap={['10px','0']}>
            <Box display={{ base: "block", md: "flex" }}>
              {/* <Button ref={btnRef} variant="solid" size="md" mr={4} onClick={onOpen}>
                User Login
              </Button> */}
              {isLoggedIn ? (
              <Link to={'/'}>
                <Button ref={btnRef} display={['none','block']} variant="solid" size="md" mr={4} onClick={handleLogout}>
                  Logout
                </Button>
              </Link>
            ) : (
              <Button ref={btnRef} bg={'none'} transition={'all 0.5s ease-in-out'} color={'white'} _hover={{bg:'none',color:'red', transform:'scale(1.1)'}} variant="solid" size="md" mr={4} onClick={onOpen}>
                User Login/SignUp
              </Button>
            )}
              
            </Box>
            <Modal
              onClose={onClose}
              finalFocusRef={btnRef}
              isOpen={isOpen}
              scrollBehavior={scrollBehavior}
              
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Login to your Account</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <UserLogin/>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Box className="adminlogin">
              {user && !isLoggedOut ? (
                ''
              ) : (
                <Box className="adminbtn" display={{ base: "block", md: "flex" }}>
                  <Link to={"/merchatLogin"}>
                    <Button bg={'none'} transition={'all 0.5s ease-in-out'} color={'white'} _hover={{bg:'none',color:'red', transform:'scale(1.1)'}} variant="solid" size="md" mr={4}>
                      Admin Login
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>
          {/* <Link to={"/userprofile"}>
            <IconButton
              size={"md"}
              variant="ghost"
              aria-label={"User"}
              icon={<FaUserCircle />}
              bg={"white"}
            />
          </Link> */}

          {isLoggedIn?(<Link to={"cart"}>
            <IconButton
              size={"md"}
              variant="ghost"
              aria-label={"Cart"}
              icon={<FaShoppingCart />}
              bg="white"
              ml={0}
            />
          </Link>):
          ''
          }
        </Flex>
      </Flex>

      {show ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {isLoggedIn ? (
              <Link to={"/"}>
                <Button variant="solid" bg={'none'} color={'white'} size="md" mr={4} onClick={handleLogout}>
                  Log out
                </Button>
              </Link>
            ) : (
              <Link to={"/userregister"}>
                <Button variant="solid" bg={'none'} color={'white'} size="md" position={{base:'absolute'}} ml={{base:'-70px'}} mt={{base:'-10px'}}>
                  Sign Up
                </Button>
              </Link>
            )}
            
          </Stack>
          
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
