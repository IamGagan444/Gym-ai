import Features from "../components/Features";

import Info from "../components/Info";
import Reviews from "../components/Reviews";
import SubscriptionCards from "../components/SubscriptionCard";

import TeamGrid from "../components/TeamGrid";
import TeamTrain from "../components/TeamTrain";

const HomePage = () => {
  return (
    <div className="bg-black">
      <Info />
      <div className="hidden sm:block bg-black py-10">
        <TeamGrid />
      </div>

      <div className="sm:hidden block">
        <TeamTrain />
      </div>
      <Features />
      <Reviews />
    
      <SubscriptionCards />
    </div>
  );
};

export default HomePage;
