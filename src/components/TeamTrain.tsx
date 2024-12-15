import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";

interface TeamMember {
  id: number;
  name: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  { id: 1, name: "Alex Thompson", image: image1 },
  { id: 2, name: "Sarah Johnson", image: image2 },
  { id: 3, name: "Mike Williams", image: image3 },
  { id: 4, name: "Emma Davis", image: image4 },
  { id: 5, name: "Chris Wilson", image: image5 },
];

export default function TeamTrain() {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-50%" });
  const containerControls = useAnimation();
  const cardsControls = useAnimation();

  const scrollingMembers = [...teamMembers, ...teamMembers];

  useEffect(() => {
    if (isInView) {
      containerControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" },
      });

      cardsControls.start({
        x: ["0%", "-100%"],
        transition: {
          duration: scrollingMembers.length * 3,
          ease: "linear",
          repeat: Infinity,
        },
      });
    } else {
      containerControls.start({ opacity: 0, y: 50 });
      cardsControls.stop();
    }
  }, [isInView, containerControls, cardsControls, scrollingMembers.length]);

  return (
    <div
      className="min-h-screen bg-black p-8 relative overflow-hidden"
      ref={sectionRef}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={containerControls}
        className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden pointer-events-none"
      >
        <div className="absolute bottom-0 right-0 w-full h-full bg-yellow-400 opacity-20 transform rotate-45 translate-x-1/4 translate-y-1/4" />
      </motion.div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={containerControls}
      >
        <div className="mb-12 text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            MEET THE <span className="text-yellow-500">Team</span>
          </h1>
          <div className="text-8xl md:text-9xl font-bold text-gray-800 absolute -top-8 md:-top-12 right-0 left-0 opacity-10 pointer-events-none">
            02
          </div>
        </div>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex space-x-6"
            animate={!isHovered ? cardsControls : undefined}
            style={{
              width: `${scrollingMembers.length * 300}px`,
            }}
          >
            {scrollingMembers.map((member, index) => (
              <div
                key={`${member.id}-${index}`}
                className="flex-shrink-0 w-72 group relative overflow-hidden rounded-lg aspect-[3/4]"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.name}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
