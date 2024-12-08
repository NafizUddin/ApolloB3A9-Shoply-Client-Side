"use client";

import Loading from "@/src/components/Loading/Loading";
import { useGetRecentViewProductsQuery } from "@/src/lib/redux/features/products/productApi";
import Image from "next/image";
import { PiStarFourFill } from "react-icons/pi";
import brand from "@/src/assets/brand.png";
import { CloudHail } from "lucide-react";
import { IRecentProductView } from "@/src/types/model";
import HomeProductCard from "@/src/components/Cards/HomeProductCard";
import Link from "next/link";

const RecentViewProducts = () => {
  const { data: recentViewedProducts, isLoading } =
    useGetRecentViewProductsQuery(undefined);

  console.log(recentViewedProducts);

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
            {recentViewedProducts?.length === 0 ? (
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
              <div className="my-14 grid grid-cols-1 md:grid-cols-2 gap-5 w-[95%] mx-auto">
                {recentViewedProducts?.map(
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
                        className="card card-side bg-base-100 shadow-xl"
                      >
                        <figure>
                          <img
                            src={singleProduct.product.image[0]}
                            alt="Movie"
                            className="w-52 h-[260px] object-cover"
                          />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title text-white text-2xl">
                            {singleProduct.product.name}
                          </h2>
                          <p className="max-w-md text-sm">
                            {singleProduct.product.description?.slice(0, 100)}
                            ...
                          </p>
                          <div className="flex gap-2 items-center">
                            <span className="font-medium md:text-xl text-white">
                              Price:
                            </span>
                            <h2
                              className={`font-medium md:text-xl text-white ${singleProduct?.product.flashSale && "line-through"}`}
                            >
                              <span>$</span>
                              {singleProduct.product.price}
                            </h2>
                            {singleProduct?.product.flashSale && (
                              <h2 className="font-medium md:text-xl text-primary">
                                <span>$</span>
                                {discountedPrice}
                              </h2>
                            )}
                          </div>
                          <div className="card-actions justify-end">
                            <Link href={`/productDetails?${params.toString()}`}>
                              <button className="relative h-10 w-full origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentViewProducts;
