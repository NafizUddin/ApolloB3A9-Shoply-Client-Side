import Footer from "@/src/components/HomeComponents/Footer/Footer";
import { ReactNode } from "react";

const HomeLayout = ({
  children,
  allCategories,
  allProducts,
}: {
  children: ReactNode;
  allCategories: ReactNode;
  allProducts: ReactNode;
}) => {
  return (
    <>
      {children}
      {allCategories}
      {allProducts}
      <Footer />
    </>
  );
};

export default HomeLayout;
