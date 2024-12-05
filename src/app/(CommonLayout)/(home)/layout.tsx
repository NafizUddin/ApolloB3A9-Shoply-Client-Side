import Footer from "@/src/components/HomeComponents/Footer/Footer";
import { ReactNode } from "react";

const HomeLayout = ({
  children,
  allCategories,
  allProducts,
  flashSale,
}: {
  children: ReactNode;
  allCategories: ReactNode;
  allProducts: ReactNode;
  flashSale: ReactNode;
}) => {
  return (
    <>
      {children}
      {allCategories}
      {allProducts}
      {flashSale}
      <Footer />
    </>
  );
};

export default HomeLayout;
