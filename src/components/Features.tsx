import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";
import { InfiniteSlider } from "../ui/InfniteSlider";
import { lazy, Suspense } from "react";

// Lazy load Features2 component
const Features2 = lazy(() => import("./Features2"));

// Dynamically import images (8 images from `../img` folder)
const images: string[] = Array.from({ length: 8 }, (_, index) =>
  new URL(`../img/${index + 1}.jpg`, import.meta.url).href
);

export default function Features() {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50%" });

  // Debounce type definition
  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced animation handler
  const handleAnimationStart = useCallback(
    debounce(() => {
      if (isInView) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 1, ease: "easeOut" },
        });
      }
    }, 200),
    [isInView, controls]
  );

  useEffect(() => {
    handleAnimationStart();
  }, [handleAnimationStart]);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="bg-black py-10 space-y-10"
    >
      <motion.div
        className="mb-12 text-center relative"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
          Featured <span className="text-yellow-500">Classes</span>
        </h1>
        <div className="text-8xl md:text-9xl font-bold text-gray-800 absolute -top-8 md:-top-12 right-0 left-0 opacity-10 pointer-events-none">
          02
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 50 }} animate={controls}>
        <InfiniteSlider gap={24} reverse>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Featured Image ${index + 1}`}
              className="aspect-square w-[120px] rounded-[4px]"
            />
          ))}
        </InfiniteSlider>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 50 }} animate={controls}>
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <Features2 />
        </Suspense>
      </motion.div>
    </motion.div>
  );
}
