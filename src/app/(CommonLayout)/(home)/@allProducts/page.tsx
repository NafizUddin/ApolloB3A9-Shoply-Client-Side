"use client";

import HomeProductCard from "@/src/components/Cards/HomeProductCard";
import SectionTitle from "@/src/components/HomeComponents/SectionTitle/SectionTitle";
import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/productApi";
import { IProduct } from "@/src/types/model";

const AllProducts = () => {
  const { data: allProductsResponse, isLoading } =
    useGetAllProductsQuery(undefined);

  return (
    <div className="pb-14 px-8">
      <SectionTitle sub="Shop The Best" heading="Explore Our Collection" />

      <div className="py-14 grid grid-cols-4 gap-3">
        {allProductsResponse?.data?.map((singleProduct: IProduct) => (
          <div key={singleProduct.id}>
            <HomeProductCard singleProduct={singleProduct} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
