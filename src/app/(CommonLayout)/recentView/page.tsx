"use client";

import { useState } from "react";
import Loading from "@/src/components/Loading/Loading";
import {
  useDeleteRecentProductMutation,
  useGetRecentViewProductsQuery,
} from "@/src/lib/redux/features/products/productApi";
import Image from "next/image";
import { PiStarFourFill } from "react-icons/pi";
import brand from "@/src/assets/brand.png";
import { IRecentProductView } from "@/src/types/model";
import Link from "next/link";
import { Pagination } from "@nextui-org/pagination";
import toast from "react-hot-toast";

const RecentViewProducts = () => {
  const { data: recentViewedProducts, isLoading } =
    useGetRecentViewProductsQuery(undefined);

  const [deleteRecentProduct] = useDeleteRecentProductMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 8;

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const paginatedProducts =
    recentViewedProducts?.slice(startIndex, endIndex) || [];
  const totalProducts = recentViewedProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / dataPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeletRecentViewedProduct = async (id: string) => {
    await toast.promise(deleteRecentProduct({ productId: id }).unwrap(), {
      loading: "Removing...",
      success: "Removed from Recent Viewed!",
      error: "Failed to remove product",
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex justify-center items-center gap-2 uppercase mt-6">
            <PiStarFourFill className="text-primary" />
            <span className="font-medium text-primary">Take a look again</span>
          </div>
          <h1 className="mt-2 text-4xl font-bold text-white text-center">
            Products You Viewed
          </h1>

          <div>
            {totalProducts === 0 ? (
              <div>
                <div className="max-w-lg mx-auto my-[83px]">
                  <div className="flex justify-center items-center">
                    <Image src={brand} alt="Product" width={200} height={200} />
                  </div>
                  <p className="text-2xl font-semibold text-center mt-3 text-white">
                    Sorry, you have viewed no products yet.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="my-14 grid grid-cols-1 lg:grid-cols-2 gap-5 w-[95%] mx-auto">
                  {paginatedProducts.map(
                    (singleProduct: IRecentProductView) => {
                      const discountPercentage =
                        (singleProduct?.product.discount ?? 0) / 100;
                      const discountAmount =
                        singleProduct.product.price * discountPercentage;
                      const discountedPrice = singleProduct?.product.flashSale
                        ? singleProduct.product.price - discountAmount
                        : singleProduct.product.price;

                      const params = new URLSearchParams();
                      params.set("product", singleProduct.product.id);

                      return (
                        <div
                          key={singleProduct.id}
                          className="card card-side bg-base-100 shadow-xl relative"
                        >
                          <span
                            onClick={() =>
                              handleDeletRecentViewedProduct(
                                singleProduct.product.id
                              )
                            }
                            className="absolute right-3 top-2 w-9 h-9 border-2 border-primary rounded-full text-center p-1 font-bold text-primary cursor-pointer hover:bg-primary hover:text-white"
                          >
                            X
                          </span>
                          <figure>
                            <img
                              src={singleProduct.product.image[0]}
                              alt="Product"
                              className="w-32 md:w-52 h-[340px] md:h-[260px] lg:h-[320px] lg:w-44 xl:w-48 xl:h-[275px] object-cover rounded-l-lg"
                            />
                          </figure>
                          <div className="card-body">
                            <h2 className="card-title text-white text-2xl">
                              {singleProduct.product.name}
                            </h2>
                            <p className="max-w-md text-sm">
                              {singleProduct.product.description?.slice(0, 90)}
                              ...
                            </p>
                            <div className="flex gap-2 items-center">
                              <span className="font-medium md:text-xl lg:text-lg xl:text-xl text-white">
                                Price:
                              </span>
                              <h2
                                className={`font-medium md:text-xl lg:text-lg xl:text-xl text-white ${
                                  singleProduct?.product.flashSale &&
                                  "line-through"
                                }`}
                              >
                                <span>$</span>
                                {singleProduct.product.price}
                              </h2>
                              {singleProduct?.product.flashSale && (
                                <h2 className="font-medium md:text-xl lg:text-lg xl:text-xl text-primary">
                                  <span>$</span>
                                  {discountedPrice}
                                </h2>
                              )}
                            </div>
                            <div>
                              {singleProduct.product.flashSale && (
                                <div className="inline-block px-3 py-1 text-sm font-medium text-white bg-primary rounded-full animate-blink">
                                  Flash Sale On!
                                </div>
                              )}
                            </div>
                            <div className="card-actions justify-start md:justify-end mt-2">
                              <Link
                                href={`/productDetails?${params.toString()}`}
                              >
                                <button className="relative h-10 w-full origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3 text-sm">
                                  View Details
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-4 pb-16">
                  <Pagination
                    total={totalPages}
                    initialPage={1}
                    page={currentPage}
                    onChange={handlePageChange}
                    showControls
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentViewProducts;
