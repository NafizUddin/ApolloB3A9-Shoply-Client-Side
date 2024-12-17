import { ICategory } from "@/src/types/model";
import Image from "next/image";
import MainModal from "../modal/ReusableModal/MainModal";
import { useDisclosure } from "@nextui-org/modal";
import UpdateCategoryModal from "../modal/ReusableModal/UpdateCategoryModal";

interface CardProps {
  singleCategory: ICategory;
}

const DashboardCategoryCard = ({ singleCategory }: CardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="bg-[#18181B] text-white rounded-lg shadow-md overflow-hidden">
      <div className="">
        <Image
          src={singleCategory?.image}
          alt="Category"
          width={320}
          height={192}
          objectFit="cover"
          className="w-[300px] h-[200px] object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-2xl font-bold text-center">
          {singleCategory?.name}
        </h3>
        <p className="text-sm text-center mt-2">
          {singleCategory?.products?.length}{" "}
          {singleCategory?.products?.length > 1
            ? "Products Available"
            : "Product Available"}
        </p>
      </div>
      <div className="flex justify-between px-4 gap-2 pb-4">
        <button
          onClick={onOpen}
          className="relative h-9 w-full origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
        >
          Edit
        </button>
        <button className="relative h-9 w-full origin-top transform rounded-lg border-2 border-primary text-white before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 bg-primary hover:text-primary hover:bg-transparent hover:before:h-full hover:before:bg-transparent uppercase font-bold px-3 transition-all duration-500 ease-in-out">
          Delete
        </button>
      </div>

      <MainModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <UpdateCategoryModal singleCategory={singleCategory} />
      </MainModal>
    </div>
  );
};

export default DashboardCategoryCard;
