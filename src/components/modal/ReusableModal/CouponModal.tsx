"use client";

import {
  useApplyCouponMutation,
  useGetAllCouponsQuery,
} from "@/src/lib/redux/features/coupon/couponApi";
import { ICoupon } from "@/src/types/model";
import { useState } from "react";
import { RiCoupon2Fill } from "react-icons/ri";
import { format } from "date-fns";
import CouponLoading from "../../LoadingCards/CouponLoading";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { setCoupon } from "@/src/lib/redux/features/coupon/couponSlice";
import toast from "react-hot-toast";

interface CouponModalProps {
  onClose?: () => void;
}

const CouponModal = ({ onClose }: CouponModalProps) => {
  const [inputCoupon, setInputCoupon] = useState<string>("");
  const { data: allCoupons, isLoading } = useGetAllCouponsQuery(undefined);
  const [copiedCouponCode, setCopiedCouponCode] = useState<string | null>(null);
  const [isCouponVerified, setIsCouponVerified] = useState(false);
  const [applyCoupon] = useApplyCouponMutation();
  const dispatch = useAppDispatch();

  const handleInput = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.loading("Applying Coupon...");

    const res = await applyCoupon({ coupon: inputCoupon }).unwrap();
    toast.dismiss();
    if (res.coupon) {
      const couponInfo = {
        code: res.coupon.code,
        discountType: res.coupon.discountType,
        discountValue: res.coupon.discountValue,
      };

      console.log("coupon info", couponInfo);

      dispatch(setCoupon({ couponInfo }));

      setIsCouponVerified(true);
      toast.success("Coupon applied successfully", {
        duration: 3000,
      });
      onClose && onClose();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCoupon(event.target.value);
  };

  const handleCopy = async (couponCode: string) => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopiedCouponCode(couponCode);

      // Reset copiedCouponCode state after 2 seconds
      setTimeout(() => setCopiedCouponCode(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div>
      <div
        className={`flex gap-2 items-center justify-center text-primary font-bold text-3xl`}
      >
        <span>
          <RiCoupon2Fill className="text-primary text-3xl" />
        </span>
        <span>Apply Coupon</span>
      </div>

      <div className="mx-auto max-w-xl">
        <div className="p-6">
          <form onSubmit={handleInput}>
            <div className="mb-4">
              <label
                htmlFor="coupon"
                className="block text-white font-semibold mb-2"
              >
                Coupon Code:
              </label>
              <input
                type="text"
                id="coupon"
                name="coupon"
                className="w-full px-4 py-2 border border-primary rounded-lg focus:ring focus:ring-primary outline-none text-white"
                placeholder="Enter your coupon code"
                value={inputCoupon}
                onChange={handleChange}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
              >
                Apply Coupon
              </button>
            </div>
          </form>

          {isCouponVerified && (
            <div className="mt-4 text-green-500 text-center font-semibold">
              Coupon code applied successfully!
            </div>
          )}
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index}>
                <CouponLoading />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {allCoupons?.map((singleCoupon: ICoupon) => (
              <div
                key={singleCoupon?.id}
                className="container border border-primary text-white p-5 rounded-lg shadow-lg max-w-md mx-auto"
              >
                <div className="text-lg mb-4">
                  {singleCoupon?.discountType === "PERCENTAGE" ? (
                    <p>
                      Get{" "}
                      <span className="text-primary font-bold">
                        <span>{singleCoupon.discountValue}</span>% OFF
                      </span>{" "}
                      your next purchase!
                    </p>
                  ) : (
                    <p>
                      Get{" "}
                      <span className="text-yellow-400 font-bold">
                        <span>$</span>
                        {singleCoupon.discountValue} OFF
                      </span>{" "}
                      your next purchase!
                    </p>
                  )}
                </div>
                <div className="text-base mb-4">Use coupon code:</div>
                <div className="bg-white text-gray-800 rounded-lg px-4 py-2">
                  <span className="text-2xl font-semibold">
                    {singleCoupon.code}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(singleCoupon.code)}
                  className="bg-primary text-white px-3 py-1 rounded hover:bg-[#c4650a] focus:outline-none focus:ring-2 focus:ring-orange-600 mt-3"
                >
                  {copiedCouponCode === singleCoupon.code ? "Copied!" : "Copy"}
                </button>
                <div className="text-sm mt-3">
                  <p>
                    Valid until{" "}
                    <span className="font-semibold">
                      {format(new Date(singleCoupon.endDate), "MMMM dd, yyyy")}
                    </span>
                  </p>
                  <p>*Terms and conditions apply.</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponModal;
