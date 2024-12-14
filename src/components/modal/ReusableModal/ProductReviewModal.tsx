"use client";

import { ReactNode, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { motion, useInView } from "framer-motion";
import ReactStars from "react-stars";
import { IOrder } from "@/src/types/model";

interface ReviewModalProps {
  onClose?: () => void;
  singleOrder?: IOrder | null;
}

interface FeedbackFormValues {
  feedback: string;
  rating: number;
}

const ProductReviewModal = ({ onClose, singleOrder }: ReviewModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    defaultValues: {
      feedback: "",
      rating: 0,
    },
  });

  const ref = useRef(null);
  const isInView = useInView(ref);

  const onSubmit = async (data: FeedbackFormValues) => {
    console.log(data);
  };

  console.log("Selected Product:", singleOrder);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-primary">
        Product Review
      </h1>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          className="flex-1"
        >
          <div className="px-10 pt-5">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
              <div>
                <Controller
                  name="feedback"
                  control={control}
                  rules={{ required: "Feedback message is required" }}
                  render={({ field }) => (
                    <textarea
                      id="feedback"
                      {...field}
                      placeholder="Enter product review"
                      rows={4}
                      className="w-full box-border p-6 rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary text-white"
                    />
                  )}
                />
                <p className="text-red-600 font-medium mt-2">
                  {errors?.feedback?.message as ReactNode}
                </p>
              </div>

              <div style={{ marginTop: "8px" }}>
                <label htmlFor="rating" className="text-lg font-semibold">
                  Rating:
                </label>
                <Controller
                  name="rating"
                  control={control}
                  rules={{
                    validate: (value) => value > 0 || "Rating is required",
                  }}
                  render={({ field }) => (
                    <ReactStars
                      count={5}
                      value={field.value}
                      onChange={(newRating) => field.onChange(newRating)}
                      size={48}
                      color2={"#f5840c"}
                    />
                  )}
                />
                <p className="text-red-600 font-medium">
                  {errors?.rating?.message as ReactNode}
                </p>
              </div>

              <button
                type="submit"
                className="relative h-12 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
              >
                Submit Review
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductReviewModal;
