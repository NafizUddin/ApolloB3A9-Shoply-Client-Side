"use client";

import { useEffect, useState } from "react";
import { useGetMyProfileQuery } from "@/src/lib/redux/features/auth/authApi";
import { selectCurrentToken } from "@/src/lib/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/lib/redux/hooks";

const useUserDetails = () => {
  const token = useAppSelector(selectCurrentToken);
  const [isRefetching, setIsRefetching] = useState(false);

  const { data, isLoading, refetch } = useGetMyProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token) {
      setIsRefetching(true);
      refetch().finally(() => {
        setIsRefetching(false);
      });
    }
  }, [token, refetch]);

  const effectiveLoading = isLoading || isRefetching;

  return { userData: data || null, isLoading: effectiveLoading, refetch };
};

export default useUserDetails;
