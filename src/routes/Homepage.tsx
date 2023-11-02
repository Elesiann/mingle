import HomeAboutBeans from "../components/layouts/HomeAboutBeans";
import HomeCheckCTA from "../components/layouts/HomeCheckCTA";
import HomeEquipment from "../components/layouts/HomeEquipment";
import HomeHeader from "../components/layouts/HomeHeader";
import HomeProducts from "../components/layouts/HomeProducts";

const Homepage = () => {
  return (
    <>
      <HomeHeader />
      <HomeProducts />
      <HomeCheckCTA />
      <HomeAboutBeans />
      <HomeEquipment />
    </>
  );
};

export default Homepage;
