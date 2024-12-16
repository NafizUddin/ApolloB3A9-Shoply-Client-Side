"use client";

import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { useGetAllOrdersQuery } from "@/src/lib/redux/features/orders/orderApi";
import { useEffect, useState } from "react";

const OrderList = () => {
  const { userData } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const [queryObj, setQueryObj] = useState({
    page: currentPage,
    limit: dataPerPage,
    vendorId: userData?.userData?.id,
  });

  const { data: vendorOrders, isLoading } = useGetAllOrdersQuery(queryObj, {
    skip: !userData?.userData,
  });

  const totalPages = Math.ceil((vendorOrders?.meta?.total || 0) / dataPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setQueryObj((prev) => ({
      ...prev,
      page: currentPage,
      limit: dataPerPage,
      vendorId: userData?.userData?.id,
    }));
  }, [currentPage, userData?.userData]);

  return (
    <div>
      <h1>Hello, OrderList </h1>
    </div>
  );
};

export default OrderList;
