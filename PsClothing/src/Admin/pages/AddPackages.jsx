import { Button, Input, Select, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AddPackages = () => {
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    categoryId: "",
    productDescription: "",
    productQuantity: "",
    merchantId: "",
    productWeight: "",
    productImage: null,
  });

  const [categories, setCategories] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.post(
          "https://www.bloomb.in/categorys/getCategory"
        );
        setCategories(response.data.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchMerchants() {
      try {
        const response = await axios.post(
          "https://www.bloomb.in/merchants/getMerchant"
        );
        setMerchants(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMerchants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the image file to base64 string
    const reader = new FileReader();
    reader.readAsDataURL(formData.productImage);
    reader.onloadend = async () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      // Send the product data to the API using Axios
      try {
        const response = await axios.post(
          "https://www.bloomb.in/products/addProduct",
          {
            ...formData,
            categoryId: formData.categoryId._id, // Extract the ID from the category object
            merchantId: formData.merchantId._id, // Extract the ID from the merchant object
            productImage: [{ path: base64String }],
          }
        );
        // console.log(response);
        toast({
          title: "Product Added Sucessfully ",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } catch (error) {
        console.error(error);
      }
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, productImage: e.target.files[0] });
  };

  const handleCategoryChange = (e) => {
    const category = JSON.parse(e.target.value);
    setFormData({ ...formData, categoryId: category }); // Store the whole category object
  };

  const handleMerchantChange = (e) => {
    const merchant = JSON.parse(e.target.value);
    setFormData({ ...formData, merchantId: merchant }); // Store the whole merchant object
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="productName"
        value={formData.productName}
        onChange={handleChange}
        placeholder="Product Name"
      />
      <Input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <Select
        name="categoryId"
        value={JSON.stringify(formData.categoryId)}
        onChange={handleCategoryChange}
        placeholder="Select Category"
      >
        {categories.map((category) => (
          <option key={category._id} value={JSON.stringify(category)}>
            {category.categoryName}
          </option>
        ))}
      </Select>
      <Input
        name="productDescription"
        value={formData.productDescription}
        onChange={handleChange}
        placeholder="Product Description"
      />
      <Input
        name="productQuantity"
        type="number"
        value={formData.productQuantity}
        onChange={handleChange}
        placeholder="Product Quantity"
      />

      <Input
        name="productWeight"
        value={formData.productWeight}
        onChange={handleChange}
        placeholder="Product Weight"
      />
      <Input type="file" name="productImage" onChange={handleImageChange} />
      <Button type="submit">Add Product</Button>
    </form>
  );
};

export default AddPackages;
