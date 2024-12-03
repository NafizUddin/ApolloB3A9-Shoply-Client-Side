import { PiStarFourFill } from "react-icons/pi";

const SectionTitle = ({ sub, heading }: { sub: string; heading: string }) => {
  return (
    <div className="">
      <div className="flex items-center gap-2 uppercase justify-center md:justify-start">
        <PiStarFourFill className="text-primary" />
        <span className="font-medium text-primary">{sub}</span>
      </div>

      <h1 className="mt-2 text-4xl font-bold text-white text-center md:text-left">
        {heading}
      </h1>
    </div>
  );
};

export default SectionTitle;
