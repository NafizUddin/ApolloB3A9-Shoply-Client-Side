"use client";

import { useGetSingleProductQuery } from "@/src/lib/redux/features/products/productApi";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("product");
    setProductId(id);
  }, [searchParams]);

  const { data, isLoading } = useGetSingleProductQuery(productId ?? "", {
    skip: !productId, // Skip query if productId is not set
  });

  console.log(data);

  return (
    <div className="py-10">
      <div className="flex flex-col lg:flex-row justify-center">
        <div className="flex-1 px-20">
          <Image
            src={data?.image}
            alt="Product Image"
            height={500}
            width={500}
            className=""
          />
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default ProductDetails;
