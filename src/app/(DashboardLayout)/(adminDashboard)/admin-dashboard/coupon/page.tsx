"use client";

import CouponLoading from "@/src/components/LoadingCards/CouponLoading";
import CreateCouponModal from "@/src/components/modal/ReusableModal/CreateCouponModal";
import MainModal from "@/src/components/modal/ReusableModal/MainModal";
import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import { useGetAllCouponsQuery } from "@/src/lib/redux/features/coupon/couponApi";
import { ICoupon } from "@/src/types/model";
import { useDisclosure } from "@nextui-org/modal";
import { Pagination } from "@nextui-org/pagination";
import { format } from "date-fns";
import { useState } from "react";

const CouponManagement = () => {
  const { data: allCoupons, isLoading } = useGetAllCouponsQuery(undefined);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const paginatedCoupons = allCoupons?.slice(startIndex, endIndex) || [];
  const totalCoupons = allCoupons?.length || 0;
  const totalPages = Math.ceil(totalCoupons / dataPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <DashboardSectionTitle heading="Coupon Management" />

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 mb-4 gap-5">
        <div>
          <h1 className="text-white text-2xl font-bold">
            Total Active Coupons: {allCoupons?.length || 0}
          </h1>
        </div>
        <div>
          <button
            onClick={onOpen}
            className="relative h-9 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
          >
            Add New Coupon
          </button>
        </div>
      </div>

      <div className="pb-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <CouponLoading />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mr-5 lg:mr-0">
            {paginatedCoupons?.map((singleCoupon: ICoupon) => {
              return (
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
                        <span className="text-primary font-bold">
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
                  <div className="text-sm mt-3">
                    <p>
                      Valid until{" "}
                      <span className="font-semibold text-primary">
                        {format(
                          new Date(singleCoupon.endDate),
                          "MMMM dd, yyyy"
                        )}
                      </span>
                    </p>
                    <p>*Terms and conditions apply.</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        {totalCoupons > 0 && (
          <div className="flex justify-center items-center mt-4">
            <Pagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={handlePageChange}
              showControls
            />
          </div>
        )}
      </div>

      <MainModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <CreateCouponModal />
      </MainModal>
    </div>
  );
};

export default CouponManagement;
