import Header from "./Header";
import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-15-pro.png";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection
        title="아이폰 15 프로 그 이상"
        subtitle="Experience the power of the latest iPhone 15 with our most Pro camera ever."
        link="/products/2"
        image={iphone}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
