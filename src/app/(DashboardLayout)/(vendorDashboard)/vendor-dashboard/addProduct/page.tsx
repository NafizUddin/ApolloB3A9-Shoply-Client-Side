"use client";

import SHFileInput from "@/src/components/form/SHFileInput";
import SHForm from "@/src/components/form/SHForm";
import SHInput from "@/src/components/form/SHInput";
import SHSelect from "@/src/components/form/SHSelect";
import SHTextarea from "@/src/components/form/SHTextArea";
import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import { useCategories } from "@/src/hooks/CustomHooks/useCategories";
import { FieldValues, SubmitHandler } from "react-hook-form";

const AddProduct = () => {
  const { categories } = useCategories();

  const flashSale = [
    { key: true, label: "Yes" },
    { key: false, label: "No" },
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data.image);

    const hasImage = !!data.image && data.image instanceof File;

    // toast.loading("Updating Profile...");

    // let imageUrl = userData?.userData?.logo;

    // if (hasImage) {
    //   const formData = new FormData();
    //   formData.append("file", data.logo);
    //   formData.append(
    //     "upload_preset",
    //     envConfig.cloudinary_upload_preset as string
    //   );

    //   try {
    //     const response = await axios.post(
    //       envConfig.cloudinary_url as string,
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );
    //     imageUrl = response.data.secure_url;
    //   } catch (error: any) {
    //     console.error(error.message);
    //     toast.error("Failed to upload image");
    //     return;
    //   }
    // }

    // const updateUserInfo = {
    //   name: data.name ? data.name : userData?.userData?.name,
    //   logo: imageUrl,
    //   shopName: data.shopName ? data.shopName : userData?.userData?.shopName,
    //   description: data.description
    //     ? data.description
    //     : userData?.userData?.description,
    // };
    // toast.dismiss();
    // console.log(updateUserInfo);

    // try {
    //   const res = await updateVendor(updateUserInfo).unwrap();
    //   if (res.success) {
    //     toast.success("Profile Updated successfully", { duration: 3000 });
    //     onClose && onClose();
    //   }
    // } catch (error: any) {
    //   console.log(error);
    //   toast.error(error.message);
    // }
  };

  return (
    <div>
      <DashboardSectionTitle heading="Add New Product" />

      <div>
        <h1 className="mt-5 mb-2 font-bold text-primary">
          Upload Product Images:
        </h1>

        <SHForm onSubmit={onSubmit}>
          <SHFileInput
            name="image"
            label="Click to upload or drag
                and drop"
            allowMultiple
          />

          <div className="flex flex-col md:flex-row my-3 gap-3">
            <div className="flex-1">
              <SHInput
                name="name"
                label="Product Name*"
                type="text"
                variant="bordered"
                required
              />
            </div>
            <div className="flex-1">
              {" "}
              <SHInput
                name="price"
                label="Product Price*"
                type="number"
                variant="bordered"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row my-3 gap-3">
            <div className="flex-1">
              <SHInput
                name="inventory"
                label="Product Inventory*"
                type="number"
                variant="bordered"
                required
              />
            </div>
            <div className="flex-1">
              {" "}
              <SHSelect
                name="category"
                label="Select a category*"
                items={categories}
                variant="bordered"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row my-3 gap-3">
            <div className="flex-1">
              {" "}
              <SHSelect
                name="flashSale"
                label="FlashSale"
                items={flashSale}
                variant="bordered"
              />
            </div>
            <div className="flex-1">
              <SHInput
                name="discount"
                label="Product Discount"
                type="number"
                variant="bordered"
              />
            </div>
          </div>

          <div className="w-full mb-5">
            <SHTextarea
              name="description"
              label="Product Description*"
              placeholder="Write a description..."
              rows={5}
              variant="bordered"
              required
            />
          </div>

          <div className="text-center pb-10">
            <button
              type="submit"
              className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
            >
              Submit
            </button>
          </div>
        </SHForm>
      </div>
    </div>
  );
};

export default AddProduct;
