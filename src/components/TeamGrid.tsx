import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";

interface TeamMember {
  id: number;
  name: string;
  occupation: string;
  image: string;
}

const initialTeamMembers: TeamMember[] = [
  { id: 1, name: "Alex Thompson", occupation: "Software Engineer", image: image1 },
  { id: 2, name: "Sarah Johnson", occupation: "Product Manager", image: image2 },
  { id: 3, name: "Mike Williams", occupation: "UI/UX Designer", image: image3 },
  { id: 4, name: "Emma Davis", occupation: "Data Scientist", image: image4 },
  { id: 5, name: "Chris Wilson", occupation: "DevOps Engineer", image: image5 },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function TeamGrid() {
  const sectionRef = useRef(null);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [prevScroll, setPrevScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > prevScroll) {
        // Scrolling down: Ascending Order
        setTeamMembers([...initialTeamMembers]);
      } else if (currentScroll < prevScroll) {
        // Scrolling up: Descending Order
        setTeamMembers([...initialTeamMembers].reverse());
      }
      setPrevScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  return (
    <div
      className="min-h-screen bg-black p-8 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-full bg-yellow-400 opacity-20 transform rotate-45 translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10">
        <div className="mb-12 text-center relative">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-2 relative z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          >
            MEET THE <span className="text-yellow-500">TEAM</span>
          </motion.h1>
        </div>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                layout
                variants={item}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] w-[250px]"
                transition={{ duration: 0.5 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-opacity duration-300 flex flex-col items-center justify-center text-center">
                  <h3 className="text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.name}
                  </h3>
                  <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.occupation}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
