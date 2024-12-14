"use client";

import SHForm from "@/src/components/form/SHForm";
import SHInput from "@/src/components/form/SHInput";
import PasswordChangeLoading from "@/src/components/LoadingCards/PasswordChangeLoading";
import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { FieldValues, SubmitHandler } from "react-hook-form";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Security = () => {
  const { userData, isLoading } = useUserDetails();

  const handlePasswordChange: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
        <DashboardSectionTitle heading="Update Login Credentials" />

        <>
          {isLoading ? (
            <PasswordChangeLoading />
          ) : (
            <div className="w-full p-6 rounded-lg shadow md:mt-5 sm:max-w-2xl sm:p-8">
              <SHForm
                defaultValues={{
                  email: userData?.userData?.email || "",
                }}
                onSubmit={handlePasswordChange}
              >
                <div className="py-5">
                  <SHInput
                    name="email"
                    label="Email"
                    type="email"
                    pathname="/login"
                    variant="bordered"
                    readonly
                  />
                </div>
                <div className="pb-5">
                  <SHInput
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                    variant="bordered"
                  />
                </div>
                <div className="pb-8">
                  <SHInput
                    name="newPassword"
                    label="New Password"
                    type="password"
                    variant="bordered"
                  />
                </div>

                <div className="flex justify-center items-center mb-10">
                  <button
                    type="submit"
                    className="relative h-10 w-full origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold"
                  >
                    Change Password
                  </button>
                </div>
              </SHForm>
            </div>
          )}
        </>
      </div>
    </section>
  );
};

export default Security;
