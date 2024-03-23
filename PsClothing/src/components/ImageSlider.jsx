import React, { useState, useEffect } from 'react';
import './ImageSlider.css'; // Import your CSS file for styling
import { Box, Image } from '@chakra-ui/react';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, images]);

  return (
    <Box className="image-slider" style={{ width: '100%' }}>
      <Box
        className="slider-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 1.5s ease-in-out', // Adjust the duration and easing as needed
          width: '100%',
          display:'flex',
        }}
      >
        {images.map((image, index) => (
            
                <Image
                  key={index}
                  src={image}
                  alt={`Image ${index}`}
                  className="slide"
                //   style={{ width: '100%', height: 'auto'}} // Set the width to '100%'
                />
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
