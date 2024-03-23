import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Stack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

function AddProductPage() {

  const initialProductData = {
    name: '',
    description: '',
    richDescription: '',
    brand: '',
    price: 0,
    originalPrice: 0,
    category: '',
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    isFeatured: false,
    image: null, // Added for image upload
  };


  const [productData, setProductData] = useState(initialProductData);

  const [categories, setCategories] = useState([]);

  const toast = useToast();
  
  useEffect(() => {
    // Fetch categories from the API and populate the options
    axios.get('https://psclothing.onrender.com/api/v1/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        toast({
          title: "Error fetching categories",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Check if the input is a file input for image
    if (name === 'image') {
      setProductData((prevData) => ({
        ...prevData,
        [name]: files[0], // Use the first selected file
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a FormData object for handling file uploads
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    
    // Send a POST request with the FormData for image upload and other data
    const token = localStorage.getItem("psclothing/admin/token");
    axios.post('https://psclothing.onrender.com/api/v1/products', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Set the content type for FormData
      }
    })
      .then(response => {
        // Handle success, e.g., show a success message

        toast({
          title: "Success",
          description: "Product added successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setProductData(initialProductData);
      })
      .catch(error => {
        // Handle errors, e.g., display an error message

        toast({
          title: "Error",
          description: "An error occurred. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box p={['20px','40px']} borderWidth="1px" bg={'white'} width={['100%','60%']} borderRadius="md" 
    boxShadow= "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Product Id</FormLabel>
            <Input
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Offers Description</FormLabel>
            <Textarea
              name="richDescription"
              value={productData.richDescription}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Brand</FormLabel>
            <Input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Original Price</FormLabel>
            <Input
              type="number"
              name="originalPrice"
              value={productData.originalPrice}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select
              name="category"
              value={productData.category}
              onChange={handleChange}
            >
              <option>Select Category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Count In Stock</FormLabel>
            <Input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
            />
          </FormControl>
          {/* <FormControl>
            <FormLabel>Rating</FormLabel>
            <Input
              type="number"
              name="rating"
              value={productData.rating}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Number of Reviews</FormLabel>
            <Input
              type="number"
              name="numReviews"
              value={productData.numReviews}
              onChange={handleChange}
            />
          </FormControl> */}
          {/* <FormControl>
            <FormLabel>Is Featured</FormLabel>
            <Input
              type="checkbox"
              name="isFeatured"
              checked={productData.isFeatured}
              onChange={handleChange}
            />
          </FormControl> */}
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              name="image"
              accept="image/*" // Accept only image files
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Add Product
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default AddProductPage;
