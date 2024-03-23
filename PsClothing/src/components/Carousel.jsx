import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import "./Slider.css"
import img1 from '../images/bg1.png'
import img2 from '../images/bg2.png'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const banners = [
  img1,
  img2,
  // Add more image URLs here
];


export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,      // Enable autoplay
    autoplaySpeed: 3000,
  };

  return (
    <Box w="100%">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <Box key={index}>
            <Image width={'100%'} src={banner} alt={`Banner ${index + 1}`} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

