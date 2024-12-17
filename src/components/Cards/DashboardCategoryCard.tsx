import { ICategory } from "@/src/types/model";
import Image from "next/image";
import MainModal from "../modal/ReusableModal/MainModal";
import { useDisclosure } from "@nextui-org/modal";
import UpdateCategoryModal from "../modal/ReusableModal/UpdateCategoryModal";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDeleteCategoryMutation } from "@/src/lib/redux/features/category/categoryApi";

interface CardProps {
  singleCategory: ICategory;
}

const DashboardCategoryCard = ({ singleCategory }: CardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    toast.loading("Deleting Category...");
    setDeleteModalOpen(false);

    try {
      const res = await deleteCategory(singleCategory?.id).unwrap();
      if (res) {
        toast.dismiss();
        toast.success("Category deleted successfully!");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

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
        <button
          onClick={() => setDeleteModalOpen(true)}
          className="relative h-9 w-full origin-top transform rounded-lg border-2 border-primary text-white before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 bg-primary hover:text-primary hover:bg-transparent hover:before:h-full hover:before:bg-transparent uppercase font-bold px-3 transition-all duration-500 ease-in-out"
        >
          Delete
        </button>
      </div>

      <MainModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <UpdateCategoryModal singleCategory={singleCategory} />
      </MainModal>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#18181B] rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-xl font-bold text-white">
              Are you sure you want to delete this category?
            </h3>
            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="relative h-10 w-24 origin-top transform rounded-lg border-2 border-primary text-white before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 bg-primary hover:text-primary hover:bg-transparent hover:before:h-full hover:before:bg-transparent uppercase font-bold px-3 transition-all duration-500 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="relative h-10 w-24 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCategoryCard;
