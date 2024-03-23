// import axios from "axios";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
// } from "@chakra-ui/react";
// import { useState } from "react";

// function AddMerchantPopup({ isOpen, onClose }) {
//   const [formValues, setFormValues] = useState({
//     merchantName: "",
//     email: "",
//     mobileNo: "",
//     password: "",
//     city: "",
//     state: "",
//     address: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormValues((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const data = {
//       merchantName: formValues.merchantName,
//       email: formValues.email,
//       mobileNo: formValues.mobileNo,
//       password: formValues.password,
//       city: formValues.city,
//       state: formValues.state,
//       address: formValues.address,
//     };

//     try {
//       const response = await axios.post(
//         "https://www.bloomb.in/merchants/merchantRegister",
//         data
//       );
//       console.log(response); // Log the response data for debugging
//       console.log(data);
//       onClose(); // Close the modal on successful submission
//     } catch (error) {
//       console.error(error); // Log any errors for debugging
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Add Merchant</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <form onSubmit={handleSubmit}>
//             <FormControl mb={4}>
//               <FormLabel>Merchant Name</FormLabel>
//               <Input
//                 name="merchantName"
//                 type="text"
//                 placeholder="Enter merchant name"
//                 value={formValues.merchantName}
//                 onChange={handleInputChange}
//               />
//             </FormControl>
//             <FormControl mb={4}>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 name="email"
//                 type="email"
//                 placeholder="Enter email"
//                 value={formValues.email}
//                 onChange={handleInputChange}
//               />
//             </FormControl>
//             <FormControl mb={4}>
//               <FormLabel>Mobile No.</FormLabel>
//               <Input
//                 name="mobileNo"
//                 type="tel"
//                 placeholder="Enter mobile number"
//                 value={formValues.mobileNumber}
//                 onChange={handleInputChange}
//               />
//             </FormControl>
//             <FormControl mb={4}>
//               <FormLabel>Password</FormLabel>
//               <Input
//                 name="password"
//                 type="password"
//                 placeholder="Enter password"
//                 value={formValues.password}
//                 onChange={handleInputChange}
//               />
//             </FormControl>
//             <FormControl mb={4}>
//               <FormLabel>City</FormLabel>
//               <Input
//                 name="city"
//                 type="text"
//                 placeholder="Enter city"
//                 value={formValues.city}
//                 onChange={handleInputChange}
//               />
//             </FormControl>
//             <FormControl mb={4}>
//               <FormLabel>State</FormLabel>
//               <Input
//                 name="state"
//                 type="text"
//                 placeholder="Enter state"
//                 value={formValues.state}
//                 onChange={handleInputChange}
//               />
//             </FormControl>
//             <FormControl mb={4}>
//               <FormLabel>Address</FormLabel>
//               <Input
//                 name="address"
//                 type="text"
//                 placeholder="Enter address"
//                 value={formValues.address}
//                 onChange={handleInputChange}
//               />
//             </FormControl>
//             <Button type="submit" colorScheme="blue" mr={3}>
//               Save
//             </Button>
//             <Button onClick={onClose}>Cancel</Button>
//           </form>
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// }

// export default AddMerchantPopup;
