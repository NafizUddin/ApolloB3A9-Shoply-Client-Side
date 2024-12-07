"use client";

import QuantitySelector from "@/src/components/ui/components/QuantitySelector";
import { useGetSingleProductQuery } from "@/src/lib/redux/features/products/productApi";
import { addProduct } from "@/src/lib/redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";

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
  const [quantity, setQuantity] = useState(0);
  const [inStock, setInStock] = useState(data?.inventory || 0);
  const isDisabled = !(inStock && quantity);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (data?.image?.length) {
      setSelectedImage(data.image[0]);
    }

    if (data?.inventory) {
      setInStock(data?.inventory);
    }
  }, [data]);

  const increment = () => {
    if (inStock > 1) {
      setQuantity((prev) => prev + 1);
      setInStock((prev: number) => prev - 1);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
      setInStock((prev: number) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    const existingProduct = products.find((p) => p.id === data?.id);

    if (existingProduct) {
      toast.error("This product is already in your cart.");
    } else {
      const productInfo = {
        id: data.id,
        name: data?.name,
        price: data?.price,
        quantity,
        image: data?.image[0],
        inStock,
      };

      console.log(productInfo);

      // dispatch(addProduct(productInfo));
      // toast.success("Product added to cart successfully.");
    }
  };

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
              <QuantitySelector
                quantity={quantity}
                increment={increment}
                decrement={decrement}
                inStock={inStock}
              />
            </div>
            <div className="flex-1 flex items-end justify-center">
              {isDisabled ? (
                <button
                  disabled={isDisabled}
                  className="flex items-center gap-2 px-6 py-[10px]  rounded-lg w-full justify-center disabled:bg-gray-700 disabled:opacity-50"
                >
                  <BsCart3 /> <span>Add to cart</span>
                </button>
              ) : (
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button w-[280px] mx-auto lg:w-full lg:mx-auto"
                >
                  <span
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 px-6 py-3  rounded-lg w-full justify-center cursor-pointer relative h-12 w-30 origin-top transform border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold"
                  >
                    <BsCart3 className="font-bold" /> <span>Add to cart</span>
                  </span>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
