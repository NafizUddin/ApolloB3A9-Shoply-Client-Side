"use client";

import { useState } from "react";
import { RiCoupon2Fill } from "react-icons/ri";

const CouponModal = () => {
  const [coupon, setCoupon] = useState<string>("");

  const handleInput = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(coupon);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
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
                className="w-full px-4 py-2 border border-primary rounded-lg focus:ring focus:ring-primary outline-none"
                placeholder="Enter your coupon code"
                value={coupon}
                onChange={handleChange}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="relative h-12 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
              >
                Apply Coupon
              </button>
            </div>
          </form>

          <div className="mt-4 text-green-500 text-center">
            Coupon code applied successfully! You saved $10.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
