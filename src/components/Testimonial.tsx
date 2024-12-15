import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { ChevronLeft, ChevronRight, Star } from "lucide-react"; // Icons from lucide-react

type UserReview = {
  id: number;
  name: string;
  review: string;
  rating: number;
  image: string;
};

const reviews: UserReview[] = [
  {
    id: 1,
    name: "Alex Johnson",
    review: "This gym is fantastic! The trainers are incredibly supportive, and the equipment is top-notch.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Emily Davis",
    review: "I love the classes here; they're super engaging, and I’ve seen great progress in my fitness journey.",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Michael Smith",
    review: "The environment is welcoming, and the staff is always ready to help. Highly recommended!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Sophia Brown",
    review: "Clean facilities and a great variety of machines and weights for all fitness levels.",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "James Wilson",
    review: "The best gym experience I’ve ever had. They genuinely care about your fitness goals.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=5",
  },
];

const Testimonial: React.FC = () => {
  const swiperRef = React.useRef<any>(null);

  return (
    <div className="relative flex justify-center items-center w-full max-w-lg mx-auto overflow-hidden p-4">
      {/* Swiper */}
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className="w-full h-[450px]"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {reviews.map((review) => (
          <SwiperSlide
            key={review.id}
            className="flex flex-col justify-center items-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white rounded-lg p-6 shadow-lg"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-24 h-24 rounded-full mb-4 border-4 border-yellow-400"
            />
            <h3 className="text-lg font-semibold">{review.name}</h3>
            <p className="text-sm text-gray-300 mt-2 text-center">
              "{review.review}"
            </p>
            <div className="flex mt-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className={`${
                    index < review.rating ? "text-yellow-400" : "text-gray-500"
                  }`}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous Button */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-16 -translate-x-1/2 top-1/2 transform -translate-y-1/2 sm:flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 backdrop-blur-lg rounded-full shadow-md hover:bg-opacity-40 transition-all  hidden z-10"
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-16 translate-x-1/2 top-1/2 transform -translate-y-1/2 sm:flex  items-center justify-center w-12 h-12 bg-white bg-opacity-20 backdrop-blur-lg rounded-full shadow-md hover:bg-opacity-40 transition-all hidden z-10"
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>
    </div>
  );
};

export default Testimonial;
