"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { RiCoupon2Fill } from "react-icons/ri";
import SHForm from "../../form/SHForm";
import SHInput from "../../form/SHInput";
import SHSelect from "../../form/SHSelect";
import SHDatePicker from "../../form/SHDatePicker";

interface CreateCouponModalProps {
  onClose?: () => void;
}

const CreateCouponModal = ({ onClose }: CreateCouponModalProps) => {
  const discountType = [
    { key: "PERCENTAGE", label: "PERCENTAGE" },
    { key: "FIXED", label: "FIXED" },
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <div
        className={`flex gap-2 items-center justify-center text-primary font-bold text-3xl`}
      >
        <span>
          <RiCoupon2Fill className="text-primary text-3xl" />
        </span>
        <span>Create Coupon</span>
      </div>

      <div className="my-10">
        <SHForm onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 my-3 gap-6">
            <div className="">
              <SHInput
                name="code"
                label="Coupon Code"
                type="text"
                variant="bordered"
                required
              />
            </div>
            <div>
              <SHSelect
                name="discountType"
                label="Selcet Discount Type"
                items={discountType}
                variant="bordered"
                required
              />
            </div>
            <div>
              <SHDatePicker
                name="endDate"
                label="Coupon Expiry Date"
                required
                variant="bordered"
              />
            </div>
            <div className="">
              {" "}
              <SHInput
                name="discountValue"
                label="DiscountValue"
                type="number"
                variant="bordered"
                required
              />
            </div>
          </div>

          <div className="text-center my-6">
            <button
              type="submit"
              className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
            >
              Submit
            </button>
          </div>
        </SHForm>
      </div>
    </div>
  );
};

export default CreateCouponModal;
