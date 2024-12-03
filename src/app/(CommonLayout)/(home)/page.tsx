import Banner from "@/src/components/HomeComponents/Banner/Banner";
import FeatureSection from "@/src/components/HomeComponents/FeatureSection/Feature";
import ScrollingMarquee from "@/src/components/HomeComponents/Marquee/Marquee";

const page = () => {
  return (
    <div className="pt-16 lg:pt-0">
      <Banner />
      <div className="py-14">
        <ScrollingMarquee />
      </div>
      <div className="pb-8">
        <FeatureSection />
      </div>
    </div>
  );
};

export default page;
