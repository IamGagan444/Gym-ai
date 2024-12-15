import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Plan = "weekly" | "monthly" | "yearly";

interface PlanDetails {
  title: string;
  price: number;
  duration: string;
  features: string[];
}

const planData: Record<Plan, PlanDetails> = {
  weekly: {
    title: "Weekly Pass",
    price: 29.99,
    duration: "week",
    features: ["Full gym access", "2 group classes", "Locker access"],
  },
  monthly: {
    title: "Monthly Membership",
    price: 99.99,
    duration: "month",
    features: [
      "Full gym access",
      "Unlimited classes",
      "Personal trainer session",
      "Sauna access",
    ],
  },
  yearly: {
    title: "Annual Commitment",
    price: 899.99,
    duration: "year",
    features: [
      "Full gym access",
      "Unlimited classes",
      "Weekly personal trainer",
      "Sauna & pool access",
      "Nutrition consultation",
    ],
  },
};

const SubscriptionCard: React.FC<{ plan: Plan; isActive: boolean }> = ({
  plan,
  isActive,
}) => {
  const { title, price, duration, features } = planData[plan];

  return (
    <motion.div
      className={`flex flex-col p-4 sm:p-6 rounded-2xl shadow-lg ${
        isActive
          ? "bg-gradient-to-br from-purple-600 to-blue-500 text-white"
          : "bg-white"
      }`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{title}</h3>
      <p className="text-3xl sm:text-4xl font-extrabold mb-2">
        ${price}
        <span className="text-base sm:text-lg font-normal">/{duration}</span>
      </p>
      <ul className="flex-grow mb-4 sm:mb-6">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center mb-2 text-sm sm:text-base"
          >
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${
                isActive ? "text-white" : "text-green-500"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`py-2 px-4 rounded-full font-bold text-sm sm:text-base ${
          isActive
            ? "bg-white text-purple-600 hover:bg-gray-100"
            : "bg-purple-600 text-white hover:bg-purple-700"
        } transition-colors duration-200`}
      >
        Choose Plan
      </button>
    </motion.div>
  );
};

const SubscriptionCards: React.FC = () => {
  const [activePlan, setActivePlan] = useState<Plan>("monthly");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const getCardPosition = (plan: Plan) => {
    if (isMobile) {
      return 0; // Center all cards on mobile
    }
    switch (activePlan) {
      case "weekly":
        return plan === "weekly" ? 0 : plan === "monthly" ? 100 : 200;
      case "monthly":
        return plan === "weekly" ? -100 : plan === "monthly" ? 0 : 100;
      case "yearly":
        return plan === "weekly" ? -200 : plan === "monthly" ? -100 : 0;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
        Choose Your Membership Plan
      </h2>
      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-8">
        {(["weekly", "monthly", "yearly"] as Plan[]).map((plan) => (
          <button
            key={plan}
            onClick={() => setActivePlan(plan)}
            className={`px-3 sm:px-4 py-2 rounded-full font-semibold text-sm sm:text-base mb-2 ${
              activePlan === plan
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors duration-200`}
          >
            {plan.charAt(0).toUpperCase() + plan.slice(1)}
          </button>
        ))}
      </div>
      <div className="overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={activePlan}
            className="flex justify-center"
            initial={{ opacity: 0, x: isMobile ? "100%" : 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isMobile ? "-100%" : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {isMobile ? (
              <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-2 sm:px-4">
                <SubscriptionCard plan={activePlan} isActive={true} />
              </div>
            ) : (
              (["weekly", "monthly", "yearly"] as Plan[]).map((plan) => (
                <motion.div
                  key={plan}
                  className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-2 sm:px-4"
                  animate={{ x: `${getCardPosition(plan)}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <SubscriptionCard
                    plan={plan}
                    isActive={activePlan === plan}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SubscriptionCards;
