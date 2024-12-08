"use client";

import Loading from "@/src/components/Loading/Loading";
import { useGetRecentViewProductsQuery } from "@/src/lib/redux/features/products/productApi";
import Image from "next/image";
import { PiStarFourFill } from "react-icons/pi";
import brand from "@/src/assets/brand.png";
import { CloudHail } from "lucide-react";

const RecentViewProducts = () => {
  const { data: recentViewedProducts, isLoading } =
    useGetRecentViewProductsQuery(undefined);

  console.log(recentViewedProducts?.length);

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
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentViewProducts;
