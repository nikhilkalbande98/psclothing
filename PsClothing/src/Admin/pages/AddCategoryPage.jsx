import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const CategoryTable = ({ categories, handleDeleteCategory }) => {
  const handleDeleteClick = (categoryId) => {
    handleDeleteCategory(categoryId);
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Category Name</Th>
          {/* <Th>Category Icon</Th>
          <Th>Category Color</Th> */}
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {categories.map((category) => (
          <Tr key={category._id}>
            <Td>{category.name}</Td>
            {/* <Td>{category.icon}</Td>
            <Td>{category.color}</Td> */}
            <Td>
              <IconButton
                icon={<FaTrash />}
                colorScheme="red"
                onClick={() => handleDeleteClick(category._id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

const AddCategoryPage = () => {
  const toast = useToast();
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [categoryColor, setCategoryColor] = useState("");

  const handleNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleIconChange = (event) => {
    setCategoryIcon(event.target.value);
  };

  const handleColorChange = (event) => {
    setCategoryColor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        name: categoryName,
        icon: categoryIcon,
        color: categoryColor,
      };

      // Replace the token with your actual token
      const token = localStorage.getItem("psclothing/admin/token");


      const response = await axios.post(
        "https://psclothing.onrender.com/api/v1/categories/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Success",
        description: "Category added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://psclothing.onrender.com/api/v1/categories");
      setCategories(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem("psclothing/admin/token");

      const response = await axios.delete(
        `https://psclothing.onrender.com/api/v1/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Category deleted successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        fetchCategories();
      } else {
        toast({
          title: "Error",
          description: "Category deletion failed. Category not found.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {

      toast({
        title: "Error",
        description: "An error occurred while deleting the category.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="800px" margin="0 auto">
      <VStack spacing={4} align="stretch">
        <FormControl id="categoryName">
          <FormLabel>Category Name&nbsp;<span style={{color:'red'}}>*</span> </FormLabel>
          <Input bg={'white'} border={'1px solid gray'} type="text" value={categoryName} onChange={handleNameChange} />
        </FormControl>
        <FormControl id="categoryIcon">
          <FormLabel>Category Icon</FormLabel>
          <Input bg={'white'} placeholder="Not Mandatory" border={'1px solid gray'} type="text" value={categoryIcon} onChange={handleIconChange} />
        </FormControl>
        <FormControl id="categoryColor">
          <FormLabel>Category Color</FormLabel>
          <Input bg={'white'} placeholder="Not Mandatory" border={'1px solid gray'} type="text" value={categoryColor} onChange={handleColorChange} />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Add Category
        </Button>
      </VStack>
      <CategoryTable categories={categories} handleDeleteCategory={handleDeleteCategory} />
    </Box>
  );
};

export default AddCategoryPage;
