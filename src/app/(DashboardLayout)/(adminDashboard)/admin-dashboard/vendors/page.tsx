"use client";

import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import { useGetAllUsersQuery } from "@/src/lib/redux/features/auth/authApi";

const VendorManagement = () => {
  const { data: allVendors, isLoading: vendorLoading } = useGetAllUsersQuery({
    role: "VENDOR",
  });

  return (
    <div>
      <DashboardSectionTitle heading="Vendor Management" />
    </div>
  );
};

export default VendorManagement;
