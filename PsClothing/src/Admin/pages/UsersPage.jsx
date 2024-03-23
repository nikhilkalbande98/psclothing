import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const UsersPage = () => {
  const user = localStorage.getItem("token")
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    address: "",
    city: "",
    state: "",
  });
  const [changedFields, setChangedFields] = useState({});
  const toast = useToast()
  // const deleteSelectedUser = (userid) => {
  //   console.log(userid);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedFields = {};
    for (const [key, value] of Object.entries(changedFields)) {
      updatedFields[key] = formData[key];
    }
    axios
      .post("https://www.bloomb.in/users/updateUser", {
        userId: selectedUser?._id,
        ...updatedFields,
      })
      .then((response) => {
        // update the user list with the updated user
        const updatedUsers = users.map((user) => {
          if (user._id === selectedUser?._id) {
            return response.data.user;
          } else {
            return user;
          }
        });
        setUsers(updatedUsers);
        // reset form and close the modal
        setFormData({
          fullName: "",
          email: "",
          mobileNo: "",
          address: "",
          city: "",
          state: "",
        });
        setChangedFields({});
        setIsOpen(false);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setChangedFields((prevState) => ({ ...prevState, [name]: true }));
  };

  // useEffect(() => {
  //   axios
  //     .post("https://psclothing.onrender.com/api/v1/users/")
  //     .then((response) => setUsers(response.data.user))
  //     .catch((error) => console.log(error));
  // }, [users]);
  // console.log(users);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("psclothing/admin/token");
          // console.log("admin user token",token)
          const response = await fetch('https://psclothing.onrender.com/api/v1/users/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            // console.log(data);
            setUsers(data)
          } else {
            // console.error('Error:', response.status, response.statusText);
            toast({
              title: response.status,
              description: response.statusText,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      };
    
      fetchData();
    }, []);

  return (
    <Box
      maxW={{ base: "90%", md: "80%", lg: "50%" }}
      mx="auto"
      mt={8}
      px={{ base: 4, md: 8 }}
    >
      {users.map((user) => (
        <Center key={user && user._id}>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            my={4}
            p={4}
            w="100%"
          >
            <Heading size="md">{user && user.name}</Heading>
            <Text fontSize="sm" color="gray.500" mb={2}>
              {user && user.email}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={2}>
              {user && user.phone}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={2}>
              {user && user.street}, {user && user.city}, {user && user.state}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={2}>
              {user && user.zip},
            </Text>
            <Box d="flex" justifyContent="flex-end">
              {/* <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                size="sm"
                mr={2}
                onClick={() => {
                  setSelectedUser(user);
                  setIsOpen(true);
                }}
              /> */}
              {/* <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                size="sm"
                mr={2}
                onClick={() => {
                  deleteSelectedUser(user._id);
                }}
              /> */}
            </Box>
          </Box>
        </Center>
      ))}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <label>
                Full Name:
                <input
                  type="text"
                  name="fullName"
                  defaultValue={selectedUser?.fullName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  defaultValue={selectedUser?.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Mobile No:
                <input
                  type="tel"
                  name="mobileNo"
                  defaultValue={selectedUser?.mobileNo}
                  onChange={handleChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  defaultValue={selectedUser?.address}
                  onChange={handleChange}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  defaultValue={selectedUser?.city}
                  onChange={handleChange}
                />
              </label>
              <label>
                State:
                <input
                  type="text"
                  name="state"
                  defaultValue={selectedUser?.state}
                  onChange={handleChange}
                />
              </label>
              <Button mt={4} type="submit">
                Save
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      ;
    </Box>
  );
};

export default memo(UsersPage);
