"use client";

import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import { useGetAllCouponsQuery } from "@/src/lib/redux/features/coupon/couponApi";

const CouponManagement = () => {
  const { data: allCoupons, isLoading } = useGetAllCouponsQuery(undefined);

  return (
    <div>
      <DashboardSectionTitle heading="Coupon Management" />
    </div>
  );
};

export default CouponManagement;
