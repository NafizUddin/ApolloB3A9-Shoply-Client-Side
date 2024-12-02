import Banner from "@/src/components/HomeComponents/Banner/Banner";
import ScrollingMarquee from "@/src/components/HomeComponents/Marquee/Marquee";

const page = () => {
  return (
    <div className="pt-16 lg:pt-0">
      <Banner />
      <div className="py-16">
        <ScrollingMarquee />
      </div>
    </div>
  );
};

export default page;
