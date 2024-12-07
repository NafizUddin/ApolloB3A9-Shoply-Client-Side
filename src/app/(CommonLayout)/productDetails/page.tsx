"use client";

import QuantitySelector from "@/src/components/ui/components/QuantitySelector";
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
    skip: !productId,
  });

  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  useEffect(() => {
    if (data?.image?.length) {
      setSelectedImage(data.image[0]);
    }
  }, [data]);

  const discountPercentage = (data?.discount ?? 0) / 100;
  const discountAmount = data?.price * discountPercentage;
  const discountedPrice = data?.flashSale
    ? data?.price - discountAmount
    : data?.price;

  return (
    <div className="py-10">
      <div className="flex flex-col lg:flex-row justify-center">
        <div className="flex-1 flex flex-col-reverse xl:flex-row px-14 gap-8 justify-center items-center xl:items-start">
          <div className="flex flex-row xl:flex-col gap-5 lg:pl-5 xl:pl-0">
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
        <div className="flex-1 space-y-3">
          <h1 className="text-primary text-4xl">{data?.name}</h1>
          <p className="text-gray-300 max-w-lg">{data?.description}</p>
          <div className="flex text-white  gap-2 items-end">
            <p
              className={`text-${data?.flashSale ? "xl" : "3xl"} ${data?.flashSale && "line-through text-2xl"}`}
            >
              <span>$</span>
              {data?.price}
            </p>
            {data?.flashSale && (
              <h2 className="font-medium md:text-3xl text-primary ml-3">
                <span>$</span>
                {discountedPrice}
              </h2>
            )}
          </div>
          <div className="flex gap-3 mt-5">
            <div className="flex-1">
              <QuantitySelector />
            </div>
            <div className="flex-1">
              <h1>Hello</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
