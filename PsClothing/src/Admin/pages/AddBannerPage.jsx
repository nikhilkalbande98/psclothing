import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Image,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import { DeleteIcon } from "@chakra-ui/icons";

const AddBannerPage = () => {
  const [image, setImage] = useState(null);
  const [bannerImage, setBannerImage] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const toast = useToast();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Create a preview of the image
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = useCallback(async () => {
    try {
      // Convert the image to base64
      const imageBase64 = await convertToBase64(image)
      const base64WithoutPrefix = imageBase64.replace(
        /^data:image\/\w+;base64,/,
        ""
      );
      // console.log(base64WithoutPrefix, "base64");
      const response = await axios.post(
        "https://www.bloomb.in/dashboard/banner",
        {
          bannerImage: [{ path: base64WithoutPrefix }],
        }
      );

      // Show success toast
      toast({
        title: "Image added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Show error toast
      toast({
        title: "Error adding image",
        description: "Failed to add image. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [image, toast]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  const fetchBanner = async () => {
    try {
      const response = await axios.post(
        "https://www.bloomb.in/dashboard/getalldashboard"
      );
      setBannerImage(response.data.data[0].bannerImage);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = useCallback(async (path) => {
    try {
      await fetch("https://www.bloomb.in/dashboard/deletebanner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bannerPath: path,
        }),
      });
      setBannerImage((prevImages) =>
        prevImages.filter((image) => image.path !== path)
      );
      toast({
        title: "Banner image deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    fetchBanner();
  }, [handleDelete, handleSubmit]);
  return (
    <>
      <VStack spacing={4}>
        {imagePreview && (
          <Box>
            <img src={imagePreview} alt="Preview" width="200" />
          </Box>
        )}
        <FormControl>
          <FormLabel htmlFor="image">Image</FormLabel>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Add Image
        </Button>
      </VStack>
      <Box>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
          ]}
          gap={4}
        >
          {bannerImage.map((image, index) => (
            <GridItem key={index}>
              <Box
                position="relative"
                mb={4}
                borderRadius="lg"
                overflow="hidden"
              >
                <Image
                  src={image.path}
                  alt="Banner image"
                  objectFit="cover"
                  height={["200px", "200px", "200px"]}
                  width="100%"
                />
                <Box
                  position="absolute"
                  top={2}
                  right={2}
                  p={2}
                  bg="white"
                  borderRadius="full"
                  boxShadow="lg"
                >
                  <IconButton
                    size="sm"
                    icon={<DeleteIcon />}
                    aria-label="Delete banner image"
                    onClick={() => handleDelete(image.path)}
                  />
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AddBannerPage;
