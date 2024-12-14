/* eslint-disable jsx-a11y/anchor-is-valid */
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { useDisclosure } from "@nextui-org/modal";
import { motion } from "framer-motion";

const VendorProfileCard = () => {
  const { userData, isLoading } = useUserDetails();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col sm:flex-row sm:max-w-2xl max-w-xs mx-auto overflow-hidden rounded-lg shadow-lg bg-[#18181B] p-2 my-16">
      <div className="p-2 sm:w-1/2">
        <img
          className="rounded sm:h-80 object-contain border-2 border-dashed border-primary px-3"
          src={
            userData?.userData?.logo ||
            "https://i.postimg.cc/d1tv6W8n/Please-Update-Your-Shop-Logo.png"
          }
          alt="Article"
        />
      </div>
      <div className="sm:p-4 p-2 sm:w-1/2 flex flex-col justify-between">
        <div>
          <a
            href="#"
            className="block sm:mt-2 text-2xl font-semibold text-white"
          >
            {userData?.userData?.shopName || "[Provide Shop Name]"}
          </a>
          <p className="mt-2 text-sm text-gray-200 dark:text-gray-400">
            {userData?.userData?.description || "[Provide Shop Description]"}
          </p>
          <div className="flex flex-wrap items-center justify-between my-6">
            <div className="space-y-1">
              <p className="text-sm text-white/70 font-medium">Products</p>
              <p className="text-2xl tracking-wider text-primary lg:text-3xl">
                23
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-white/70 font-medium">Orders</p>
              <p className="text-2xl tracking-wider text-primary lg:text-3xl">
                314
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-white/70 font-medium">Reviews</p>
              <p className="text-2xl tracking-wider text-primary lg:text-3xl">
                487
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <button className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfileCard;
