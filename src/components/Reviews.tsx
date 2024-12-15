import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import BeforeAfter from "./BeforeAfter";
import Testimonial from "./Testimonial";

const Reviews = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-50%" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.2 },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      className="bg-black py-10"
      initial="hidden"
      animate={controls}
    >
      <motion.div className="text-center" variants={titleVariants}>
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Public <span className="text-yellow-500">Reviews</span>
        </h1>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row justify-center md:justify-between items-center py-10 space-y-10"
        variants={contentVariants}
      >
        <BeforeAfter />
        <Testimonial />
      </motion.div>
    </motion.div>
  );
};

export default Reviews;
