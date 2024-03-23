import { useState } from "react";
import {
  Box,
  HStack,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import Logo from "../images/logo.jpeg";

const AdNavbar = () => {
  return (
    <Box bg=" rgb(28, 28, 41)" px={4} boxShadow="md" p={7}>
      <IconButton
        size={"md"}
        icon={<HamburgerIcon />}
        aria-label={"Open Menu"}
        display={{ md: "none" }}
      />
      <HStack spacing={8} alignItems={"center"}>
        <Link to={"/dashboard"}>
          <Image src={Logo} alt="Logo" boxSize="50px" />
        </Link>
        <HStack
          as={"nav"}
          spacing={4}
          display={{ base: "none", md: "flex" }}
        ></HStack>
      </HStack>
    </Box>
  );
};

export default AdNavbar;
