import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaStore, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

function Merchants() {
  const [merchants, setMerchants] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    merchantName: "",
    email: "",
    mobileNo: "",
    address: "",
    city: "",
    pinCode: "",
    state: "",
  });

  const [changedFields, setChangedFields] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedFields = {};
    for (const [key, value] of Object.entries(changedFields)) {
      updatedFields[key] = formData[key];
    }
    axios
      .post("https://www.bloomb.in/merchants/updateMerchant", {
        userId: selectedUser?._id,
        ...updatedFields,
      })
      .then((response) => {
        // update the user list with the updated user
        const updatedUsers = merchants.map((user) => {
          if (user._id === selectedUser?._id) {
            return response.data.user;
          } else {
            return user;
          }
        });
        setMerchants(updatedUsers);
        // reset form and close the modal
        setFormData({
          merchantName: "",
          email: "",
          mobileNo: "",
          address: "",
          city: "",
          pinCode: "",
          state: "",
        });
        setChangedFields({});
        setIsOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setChangedFields((prevState) => ({ ...prevState, [name]: true }));
  };

  const toast = useToast(); // Initialize the useToast hook
  useEffect(() => {
    async function fetchMerchants() {
      try {
        const response = await axios.post(
          "https://www.bloomb.in/merchants/getMerchant"
        );
        setMerchants(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMerchants();
  }, []);

  const handleEditMerchant = (merchant) => {
    // Handle edit merchant logic
    // console.log("Edit merchant with id:", id);
    setSelectedUser(merchant);
    // Open the modal
    setIsOpen(true);
  };

  const handleDeleteMerchant = async (merchantId) => {
    try {
      // Send delete request to the API
      await axios.post("https://www.bloomb.in/merchants/deleteMerchant", {
        merchantId,
      });

      setMerchants((merchants) =>
        merchants.filter((merchant) => merchant._id !== merchantId)
      );
      // Show success toast
      toast({
        title: "Merchant Deleted",
        description: `Merchant with id ${merchantId} has been deleted successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      // Handle error response according to API response structure
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to delete merchant. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Box>
        <Heading mb={4} textAlign="center">
          Merchants
        </Heading>
        <Flex flexWrap="wrap">
          {merchants.map((merchant) => (
            <Box
              key={merchant._id}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              m={2}
              width={{ base: "100%", sm: "48%", md: "32%", lg: "24%" }}
            >
              <Box d="flex" alignItems="center" mb={4}>
                <Box as={FaStore} mr={2} />
                <Text fontWeight="bold">
                  Merchant Name:-{merchant.merchantName}
                </Text>
                <Text fontWeight="bold">
                  Mobile Number:-{merchant.mobileNo}
                </Text>
              </Box>
              <Text>{merchant.description}</Text>
              <Flex justifyContent="flex-end" mt={4}>
                <IconButton
                  icon={<FaEdit />}
                  variant="outline"
                  colorScheme="blue"
                  aria-label="Edit"
                  onClick={() => handleEditMerchant(merchant)}
                />
                <IconButton
                  icon={<FaTrash />}
                  variant="outline"
                  colorScheme="red"
                  aria-label="Delete"
                  ml={2}
                  onClick={() => handleDeleteMerchant(merchant._id)}
                />
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
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
                  name="merchantName"
                  defaultValue={selectedUser?.merchantName}
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
                PinCode:
                <input
                  type="text"
                  name="pinCode"
                  defaultValue={selectedUser?.pinCode}
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
    </>
  );
}

export default Merchants;
