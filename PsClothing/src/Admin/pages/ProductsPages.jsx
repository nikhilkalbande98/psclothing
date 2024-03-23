import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ChakraProvider,
  extendTheme,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Flex,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.100',
      },
    },
  },
});

function ProductsPages() {
  const [products, setProducts] = useState([]);
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const { isOpen: isUpdateModalOpen, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } = useDisclosure();
  const [updatingProduct, setUpdatingProduct] = useState({
    name: '',
    description: '',
    richDescription: '',
    price: '',
    originalPrice: '',
    image: '',
    brand: '',
    category: '',
    countInStock: '',
    rating: '',
    numReviews: '',
    isFeatured: '',
  });
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [updateProd, setUpdateProd] = useState();
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://psclothing.onrender.com/api/v1/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        toast({
          title: 'Failed to fetch products',
          description: 'Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Failed to fetch products',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteProduct = (productId) => {
    setDeletingProductId(productId);
    onOpenDeleteModal();
  };

  const handleUpdateProduct = (product, productId) => {
    setUpdatingProduct({
      name: product.name,
      description: product.description,
      richDescription: product.richDescription,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      brand: product.brand,
      category: product.category.name,
      countInStock: product.countInStock,
      rating: product.rating,
      numReviews: product.numReviews,
      isFeatured: product.isFeatured,
    });
    console.log(product.category.name)
    onOpenUpdateModal();
    setUpdateProd(productId);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('psclothing/admin/token');

      const response = await fetch(`https://psclothing.onrender.com/api/v1/products/${deletingProductId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onCloseDeleteModal();
        fetchProducts();
      } else {
        toast({
          title: 'Failed to delete product',
          description: 'Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Failed to delete product',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleProductUpdate = async () => {
    try {
      const token = localStorage.getItem('psclothing/admin/token');
      const formData = new FormData();
  
      formData.append('name', updatingProduct.name);
      formData.append('description', updatingProduct.description);
      formData.append('richDescription', updatingProduct.richDescription);
      formData.append('price', updatingProduct.price);
      formData.append('originalPrice', updatingProduct.originalPrice);
      formData.append('image', updatingProduct.image);
      formData.append('brand', updatingProduct.brand);
  
      // Make sure to send the category ID, not the category name
      const categoryId = await fetchCategoryIdByName(updatingProduct.category);
      formData.append('category', categoryId);
  
      formData.append('countInStock', updatingProduct.countInStock);
      formData.append('rating', updatingProduct.rating);
      formData.append('numReviews', updatingProduct.numReviews);
      formData.append('isFeatured', updatingProduct.isFeatured);
  
      const response = await fetch(`https://psclothing.onrender.com/api/v1/products/${updateProd}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        onCloseUpdateModal();
        fetchProducts();
        toast({
          title: 'Updated',
          description: 'Product successfully updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Failed to update product',
          description: 'Please try again later.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Failed to update product',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const fetchCategoryIdByName = async (categoryName) => {
    try {
      const response = await fetch(`https://psclothing.onrender.com/api/v1/categories?name=${categoryName}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          return data[0]._id; // Assuming the first category with the given name is the correct one
        }
      }
      // Handle errors or return a default value
      return '';
    } catch (error) {
      // Handle unexpected errors
      console.error('Error fetching category ID by name:', error);
      // You can show an error message or handle it based on your application's requirements
      // ...
      return '';
    }
  };
  

  return (
    <ChakraProvider theme={theme}>
      {isDeleteModalOpen || isUpdateModalOpen ? null : (
        <Table size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Rich Description</Th>
              <Th>Price</Th>
              <Th>Original Price</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product._id}>
                <Td fontSize={'13px'}>{product.name}</Td>
                <Td fontSize={'14px'}>{product.description}</Td>
                <Td fontSize={'14px'}>{product.richDescription}</Td>
                <Td fontSize={'15px'} fontWeight={'500'} color={'red'}>
                  ₹{product.price}
                </Td>
                <Td fontSize={'15px'} fontWeight={'500'} color={'red'}>
                  ₹{product.originalPrice}
                </Td>
                <Td>
                  <Box maxW="100px" maxH="100px" overflow="hidden">
                    <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '10px' }} />
                  </Box>
                </Td>
                <Td>
                  <Flex flexDirection={'column'} gap={2}>
                    <Button
                      border={'1px solid red'}
                      fontSize={'14px'}
                      padding={'0px'}
                      bg={'none'}
                      color={'red'}
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      border={'1px solid teal'}
                      fontSize={'14px'}
                      bg={'none'}
                      color={'teal.700'}
                      onClick={() => handleUpdateProduct(product, product._id)}
                    >
                      Update
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this product?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={confirmDelete}>
              Confirm
            </Button>
            <Button onClick={onCloseDeleteModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isUpdateModalOpen} onClose={onCloseUpdateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label>Name</label>
              <Input
                name="name"
                value={updatingProduct.name}
                onChange={(e) => {
                  setUpdatingProduct({
                    ...updatingProduct,
                    name: e.target.value,
                  });
                }}
              />
              <label>Description</label>
              <Input
                name="description"
                value={updatingProduct.description}
                onChange={(e) => {
                  setUpdatingProduct({
                    ...updatingProduct,
                    description: e.target.value,
                  });
                }}
              />
              <label>Rich Description</label>
              <Input
                name="richDescription"
                value={updatingProduct.richDescription}
                onChange={(e) => {
                  setUpdatingProduct({
                    ...updatingProduct,
                    richDescription: e.target.value,
                  });
                }}
              />
              <label>Price</label>
              <Input
                name="price"
                value={updatingProduct.price}
                onChange={(e) => {
                  setUpdatingProduct({
                    ...updatingProduct,
                    price: e.target.value,
                  });
                }}
              />
              <label>Original Price</label>
              <Input
                name="originalPrice"
                value={updatingProduct.originalPrice}
                onChange={(e) => {
                  setUpdatingProduct({
                    ...updatingProduct,
                    originalPrice: e.target.value,
                  });
                }}
              />
              <label>Brand</label>
              <Input
                name="brand"
                value={updatingProduct.brand}
                onChange={(e) => {
                  setUpdatingProduct({
                    ...updatingProduct,
                    brand: e.target.value,
                  });
                }}
              />
              <label>Category</label>
              <Input
                name="category"
                value={updatingProduct.category}
                onChange={(e) => {
                  setUpdatingProduct({
                    ...updatingProduct,
                    category: e.target.value,
                  });
                }}
              />
              <label>Count in Stock</label>
              <Input
                name="countInStock"
                value={updatingProduct.countInStock}
                onChange={(e) => {
                  setUpdatingProduct({
                    ...updatingProduct,
                    countInStock: e.target.value,
                  });
                }}
              />
              <label>Rating</label>
              <Input
                name="rating"
                value={updatingProduct.rating}
                onChange={(e) => {
                  setUpdatingProduct({
                    ...updatingProduct,
                    rating: e.target.value,
                  });
                }}
              />
              <label>Number of Reviews</label>
              <Input
                name="numReviews"
                value={updatingProduct.numReviews}
                onChange={(e) => {
                  setUpdatingProduct({
                    ...updatingProduct,
                    numReviews: e.target.value,
                  });
                }}
              />
              <label>Is Featured</label>
              <Input
                name="isFeatured"
                value={updatingProduct.isFeatured}
                onChange={(e) => {
                  setUpdatingProduct({
                    ...updatingProduct,
                    isFeatured: e.target.value,
                  });
                }}
              />
              
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleProductUpdate}>
              Update
            </Button>
            <Button onClick={onCloseUpdateModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default ProductsPages;
