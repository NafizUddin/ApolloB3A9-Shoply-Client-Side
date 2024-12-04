import Footer from "@/src/components/HomeComponents/Footer/Footer";
import { ReactNode } from "react";

const HomeLayout = ({
  children,
  allCategories,
}: {
  children: ReactNode;
  allCategories: ReactNode;
}) => {
  return (
    <>
      {children}
      {allCategories}
      <Footer />
    </>
  );
};

export default HomeLayout;
