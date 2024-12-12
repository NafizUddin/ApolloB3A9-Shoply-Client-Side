"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addProduct,
  clearCart,
} from "@/src/lib/redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import { IProduct } from "@/src/types/model";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdCart } from "react-icons/io";
import WarningModal from "../modal/WarningModal";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  singleProduct: IProduct;
  isCompareActive?: boolean;
  compareProducts: IProduct[];
  onCompareCheckbox: (checked: boolean, product: IProduct) => void;
}

const HomeProductCard = ({
  singleProduct,
  isCompareActive,
  compareProducts,
  onCompareCheckbox,
}: ProductCardProps) => {
  const params = new URLSearchParams();
  params.set("product", singleProduct.id);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<any>(null);
  const { userData } = useUserDetails();
  const router = useRouter();
  const isChecked =
    compareProducts && compareProducts?.some((p) => p.id === singleProduct.id);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCompareCheckbox(e.target.checked, singleProduct);
  };

  const addProductToCart = () => {
    if (!userData?.userData) {
      router.push("/login");
      return;
    }

    const productInfo = {
      id: singleProduct.id,
      name: singleProduct?.name,
      price: singleProduct?.price,
      quantity: 1,
      image: singleProduct?.image[0],
      inStock: singleProduct.inventory - 1,
      vendorId: singleProduct?.vendor?.id,
    };

    dispatch(addProduct(productInfo));
    toast.success("Product added to cart successfully!");
  };

  const handleAddToCart = () => {
    const existingVendorId = products[0]?.vendorId;

    console.log(existingVendorId, singleProduct?.vendor?.id);

    if (existingVendorId && existingVendorId !== singleProduct?.vendor?.id) {
      setPendingProduct({
        id: singleProduct.id,
        name: singleProduct?.name,
        price: singleProduct?.price,
        quantity: 1,
        image: singleProduct?.image[0],
        inStock: singleProduct.inventory - 1,
        vendorId: singleProduct?.vendor?.id,
      });
      setIsModalOpen(true);
    } else {
      addProductToCart();
    }
  };

  const handleConfirmReplace = () => {
    dispatch(clearCart());
    addProductToCart();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setPendingProduct(null);
    setIsModalOpen(false);
  };

  const discountPercentage = (singleProduct?.discount ?? 0) / 100;
  const discountAmount = singleProduct.price * discountPercentage;
  const discountedPrice = singleProduct.flashSale
    ? singleProduct.price - discountAmount
    : singleProduct.price;

  return (
    <div className="relative max-w-[350px] space-y-4 rounded-lg p-4 shadow-lg md:w-[312px] bg-[#18181B] group">
      {/* Comparison checkbox */}
      {isCompareActive && (
        <div className="flex gap-3 items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                isChecked ? "bg-[#f5840c]" : "bg-gray-300"
              }`}
            >
              {isChecked && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.2l-3.5-3.5L4 14l5 5L20 8.6 18.5 7l-9.5 9.2z" />
                </svg>
              )}
            </div>
          </label>

          <p className="text-white font-medium">Select to Compare</p>
        </div>
      )}

      {/* Image Section */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          className="h-[275px] w-[306px] rounded-lg object-cover duration-300 group-hover:scale-110"
          src={singleProduct.image[0]}
          alt={singleProduct.name}
        />

        {singleProduct.flashSale && (
          <button className="absolute top-3 right-3 rounded-xl bg-primary px-3 py-1 font-medium duration-200 text-white">
            {singleProduct.discount}% off
          </button>
        )}

        {userData?.userData ? (
          <div>
            {singleProduct.inventory > 0 && (
              <label
                htmlFor="my-drawer-4"
                className="drawer-button w-[280px] mx-auto lg:w-full lg:mx-auto"
              >
                <span
                  onClick={handleAddToCart}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-40 h-[75px] rounded-t-full bg-primary text-white flex flex-col items-center justify-center text-sm font-semibold opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300 cursor-pointer border border-white"
                >
                  <span>
                    <IoMdCart className="text-xl" />
                  </span>
                  <span className="text-lg">Add to Cart</span>
                </span>
              </label>
            )}
          </div>
        ) : (
          <span
            onClick={handleAddToCart}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-40 h-[75px] rounded-t-full bg-primary text-white flex flex-col items-center justify-center text-sm font-semibold opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300 cursor-pointer border border-white"
          >
            <span>
              <IoMdCart className="text-xl" />
            </span>
            <span className="text-lg">Add to Cart</span>
          </span>
        )}
      </div>

      {/* Details Section */}
      <div className="gap-2 flex flex-col">
        <h1 className="text-xl font-semibold text-white flex-grow">
          {singleProduct?.name}
        </h1>
        <div className="flex gap-2 items-center mt-3 mb-1">
          <span className="font-medium md:text-lg text-white">Price:</span>
          <h2
            className={`font-medium md:text-lg text-white ${singleProduct?.flashSale && "line-through"}`}
          >
            <span>$</span>
            {singleProduct?.price}
          </h2>
          {singleProduct?.flashSale && (
            <h2 className="font-medium md:text-lg text-primary">
              <span>$</span>
              {discountedPrice}
            </h2>
          )}
        </div>
        <p>{singleProduct?.category?.name}</p>

        <Link href={`/productDetails?${params.toString()}`}>
          <button className="relative h-10 w-full origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
            View Details
          </button>
        </Link>

        <WarningModal
          isOpen={isModalOpen}
          onConfirm={handleConfirmReplace}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default HomeProductCard;
