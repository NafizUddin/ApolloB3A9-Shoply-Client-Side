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

  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  useEffect(() => {
    if (data?.image?.length) {
      setSelectedImage(data.image[0]);
    }
  }, [data]);

  return (
    <div className="py-10">
      <div className="flex flex-col lg:flex-row justify-center">
        <div className="flex-1 flex px-14 gap-8 justify-center">
          <div className="flex flex-col gap-5">
            {data?.image?.map((singleImage: string, index: number) => (
              <div
                key={index}
                className={`relative rounded-lg border-2 cursor-pointer ${
                  singleImage === selectedImage
                    ? "border-primary"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(singleImage)}
              >
                <Image
                  src={singleImage}
                  alt="Product Image"
                  height={100}
                  width={100}
                  className="rounded-lg"
                />
                {singleImage === selectedImage && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg" />
                )}
              </div>
            ))}
          </div>

          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected Product Image"
              height={400}
              width={400}
              className="rounded-lg object-cover"
            />
          )}
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default ProductDetails;
