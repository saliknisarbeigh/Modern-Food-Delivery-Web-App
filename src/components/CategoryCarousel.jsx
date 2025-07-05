import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  {
    name: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QnVyZ2Vyc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Pizzas",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGl6emFzfGVufDB8fDB8fHww",
  },
  {
    name: "Momos",
    image:
      "https://images.unsplash.com/photo-1738608084602-f9543952188e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE1vbW9zfGVufDB8fDB8fHww",
  },
  {
    name: "Shakes",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2hha2VzfGVufDB8fDB8fHww",
  },
  {
    name: "Shawarma",
    image:
      "https://images.unsplash.com/photo-1662116765994-1e4200c43589?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2hhd2FybWF8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Rolls",
    image:
      "https://images.unsplash.com/photo-1593614201641-6f16f8e41a4e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Um9sbHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Samosa",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2Ftb3NhfGVufDB8fDB8fHww",
  },
  {
    name: "Biryani",
    image:
      "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Ice Cream",
    image:
      "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SWNlJTIwQ3JlYW18ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Cakes",
    image:
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENha2VzfGVufDB8fDB8fHww",
  },
];

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute z-10 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-100 transition right-[-1.2rem] top-1/2 -translate-y-1/2 md:right-[-2.2rem]"
      onClick={onClick}
      aria-label="Next"
      style={{ boxShadow: "0 2px 8px 0 rgba(60,60,60,0.10)" }}
    >
      <svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#FC8019"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute z-10 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-100 transition left-[-1.5rem] top-1/2 -translate-y-1/2 md:left-[-2.5rem]"
      onClick={onClick}
      aria-label="Previous"
      style={{ boxShadow: "0 2px 8px 0 rgba(60,60,60,0.10)" }}
    >
      <svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#FC8019"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 2,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 4, slidesToScroll: 2 },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
      },
    },
  ],
};

const CategoryCarousel = () => (
  <div className="w-full max-w-6xl mx-auto px-2 md:px-0 py-6 relative">
    <Slider {...settings} className="!flex items-center">
      {categories.map((cat) => (
        <div key={cat.name} className="flex flex-col items-center px-2">
          <div className="rounded-full w-24 h-24 md:w-28 md:h-28 bg-white border-2 border-gray-100 shadow-sm mb-2 flex items-center justify-center overflow-hidden">
            <img
              src={cat.image}
              alt={cat.name}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
          <span className="mt-1 text-base md:text-lg font-semibold text-gray-800 text-center">
            {cat.name}
          </span>
        </div>
      ))}
    </Slider>
  </div>
);

export default CategoryCarousel;
