import Header from "./Header";
import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection
        title="아이폰 14 프로 그 이상"
        subtitle="Experience the power of the latest iPhone 14 with our most Pro camera ever."
        link="/product/667ba26fb15a45f5fe76b751"
        image={iphone}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
