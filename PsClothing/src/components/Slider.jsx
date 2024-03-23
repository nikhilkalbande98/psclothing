import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";

// import required modules


const SliderCom = () => {
  

  const deals = [
    {
      id: 1,
      off: "74%",
      title: "Best Deals on Mobile",
      imgurl: "https://m.media-amazon.com/images/I/31pnHwpqNhL._AC_SY200_.jpg",
    },
    {
      id: 2,
      off: "32%",
      title: "Bata, Hush Puppies & More",
      imgurl: "https://m.media-amazon.com/images/I/81TBkVDGeGL._AC_SY200_.jpg",
    },
    {
      id: 3,
      off: "87%",
      title: "Wallpapers from wolphin",
      imgurl: "https://m.media-amazon.com/images/I/51kdwtY1KvL._AC_SY200_.jpg",
    },
    {
      id: 4,
      off: "45%",
      title: "Best Selling Toys from Einstein box",
      imgurl: "https://m.media-amazon.com/images/I/51RwTTvO3IL._AC_SY200_.jpg",
    },
    {
      id: 5,
      off: "21%",
      title: "Best Selling Toys from Smartivity",
      imgurl: "https://m.media-amazon.com/images/I/51cJxhsBpaL._AC_SY200_.jpg",
    },
    {
      id: 6,
      off: "26%",
      title: "WaterScience",
      imgurl: "https://m.media-amazon.com/images/I/31NDLo8vP7L._AC_SY200_.jpg",
    },
    {
      id: 7,
      off: "78%",
      title: "Best Offers on RED Tape Footwear",
      imgurl: "https://m.media-amazon.com/images/I/31nQtukA3bL._AC_SY200_.jpg",
    },
    {
      id: 8,
      off: "66%",
      title: "Min 50% off on Puma",
      imgurl: "https://m.media-amazon.com/images/I/31B9dfuJThS._AC_SY200_.jpg",
    },
  ];

  return (
    <Box m={4} bg={"white"} borderRadius={5}>
      <Flex pl={4} pt={4} gap={4}>
        <Text fontWeight={500} fontSize={"1.4rem"}>
          Today's Deals
        </Text>
        <Link mt={2} fontSize={"14px"} color={"blue.700"}>
          See all deals
        </Link>
      </Flex>
      <Swiper
        slidesPerView={5}
        spaceBetween={0}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
        autoplay={{
          delay: 3000,              // Set the delay in milliseconds (3 seconds in this case)
          disableOnInteraction: false,  // Prevent auto-slide from stopping on user interaction
        }}
      >
        {deals.map((el, i) => (
          <SwiperSlide key={i}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box m={4} p={2} bg={"gray.200"} borderRadius={10} pb={5}>
                <Box p={4}>
                  <Image
                    borderRadius={"15px"}
                    width={"200px"}
                    height={"180px"}
                    src={el.imgurl}
                  />
                </Box>
                <Flex gap={1} justifyContent={"center"}>
                  <Text
                    bg={"red.600"}
                    py={1}
                    px={2}
                    fontSize={"13px"}
                    borderRadius={"2px"}
                    color={"white"}
                  >
                    Up to {el.off} off
                  </Text>
                  <Text p={1} fontSize={"13px"}>
                    Deal of the day
                  </Text>
                </Flex>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SliderCom;
