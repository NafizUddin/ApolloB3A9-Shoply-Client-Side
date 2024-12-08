"use client";

import Loading from "@/src/components/Loading/Loading";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { useGetSingleVendorQuery } from "@/src/lib/redux/features/auth/authApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ShopPage = () => {
  const searchParams = useSearchParams();
  const [vendorId, setVendorId] = useState<string | null>(null);
  const { userData } = useUserDetails();

  useEffect(() => {
    const id = searchParams.get("shop");
    setVendorId(id);
  }, [searchParams]);

  const { data: singleVendor, isLoading } = useGetSingleVendorQuery(
    vendorId ?? "",
    {
      skip: !vendorId,
    }
  );

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="p-6 flex flex-col justify-center items-center">
            <div className="mb-4 space-y-2">
              <div className="flex justify-center items-center">
                <img
                  src={singleVendor?.logo}
                  alt={singleVendor?.shopName || "Vendor Logo"}
                  className="object-cover h-24"
                />
              </div>

              <div className="space-y-2 flex flex-col justify-center items-center">
                <h2 className="text-4xl font-semibold text-white">
                  {singleVendor?.shopName || "Shop Name"}
                </h2>
                <p className="text-white/80 text-lg max-w-lg mx-auto text-center">
                  {singleVendor?.description || "No description available."}
                </p>
                <p className="text-white/70 text-lg">
                  {singleVendor?.followers?.length || 0} Followers
                </p>
                {userData?.userData?.role === "USER" && (
                  <button className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
