"use client";

import HomeProductCard from "@/src/components/Cards/HomeProductCard";
import SectionTitle from "@/src/components/HomeComponents/SectionTitle/SectionTitle";
import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/productApi";
import { IProduct } from "@/src/types/model";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/pagination";

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(4);
  const [queryObj, setQueryObj] = useState({
    flashSale: false,
    page: currentPage,
    limit: dataPerPage,
  });

  const {
    data: allProductsResponse,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(queryObj);

  const totalPages = Math.ceil(
    (allProductsResponse?.meta?.total || 0) / dataPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Update queryObj whenever selectedSort changes
    setQueryObj({
      page: currentPage,
      limit: dataPerPage,
      flashSale: false,
    });
    refetch();
  }, [currentPage, refetch]);

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

      <div>
        {allProductsResponse?.data?.length > 0 && (
          <div className="flex justify-center items-center mt-4">
            <Pagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={handlePageChange}
              showControls
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
