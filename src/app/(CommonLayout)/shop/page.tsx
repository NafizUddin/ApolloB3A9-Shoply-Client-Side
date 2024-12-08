"use client";

import HomeProductCard from "@/src/components/Cards/HomeProductCard";
import Loading from "@/src/components/Loading/Loading";
import ProductLoading from "@/src/components/LoadingCards/ProductLoading";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { useGetSingleVendorQuery } from "@/src/lib/redux/features/auth/authApi";
import { IProduct } from "@/src/types/model";
import { Pagination } from "@nextui-org/pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ShopPage = () => {
  const searchParams = useSearchParams();
  const [vendorId, setVendorId] = useState<string | null>(null);
  const { userData } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 8;

  useEffect(() => {
    const id = searchParams.get("shop");
    setVendorId(id);
  }, [searchParams]);

  const { data: singleVendor, isLoading } = useGetSingleVendorQuery(
    vendorId ?? "",
    {
      skip: !vendorId,
    }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const paginatedProducts =
    singleVendor?.products?.slice(startIndex, endIndex) || [];
  const totalProducts = singleVendor?.products?.length || 0;
  const totalPages = Math.ceil(totalProducts / dataPerPage);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pb-14">
          {/* Shop Details part */}
          <div className="p-6 flex flex-col justify-center items-center">
            <div className="mb-4 space-y-2">
              <div className="flex justify-center items-center">
                <img
                  src={singleVendor?.logo}
                  alt={singleVendor?.shopName || "Vendor Logo"}
                  className="object-cover h-24"
                />
              </div>

              <div className="space-y-2 flex flex-col justify-center items-center">
                <h2 className="text-4xl font-semibold text-white">
                  {singleVendor?.shopName || "Shop Name"}
                </h2>
                <p className="text-white/80 text-lg max-w-lg mx-auto text-center">
                  {singleVendor?.description || "No description available."}
                </p>
                <p className="text-white/70 text-lg">
                  {singleVendor?.followers?.length || 0} Followers
                </p>
                {userData?.userData?.role === "USER" && (
                  <button className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Shop product part */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-3">
            {isLoading
              ? Array.from({ length: dataPerPage }).map((_, index) => (
                  <div key={index}>
                    <ProductLoading />
                  </div>
                ))
              : paginatedProducts.map((singleProduct: IProduct) => (
                  <div key={singleProduct.id}>
                    <HomeProductCard singleProduct={singleProduct} />
                  </div>
                ))}
          </div>

          <div className="pt-7">
            {totalProducts > 0 && (
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
      )}
    </div>
  );
};

export default ShopPage;
