"use client";
import logo from "@/src/assets/logo.png";
import { forgotPassword } from "@/src/services/AuthServices";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner6 } from "react-icons/im";

const ForgotPassword = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    toast.loading("Loading...");

    const userData = { email: value };

    const response = await forgotPassword(userData);
    toast.dismiss();

    if (response?.success) {
      setLoading(false);
      setValue("");
      return toast.success("Password reset URL has been sent to your email", {
        duration: 6000,
      });
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          <div className="flex justify-center items-center">
            <Link
              href={"/"}
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
            >
              <Image
                className=""
                src={logo}
                alt="logo"
                width={200}
                height={200}
              />
            </Link>
          </div>

          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Forgot your password?
          </h1>
          <p className="font-light text-gray-500">
            Don&apos;t fret! Just type in your email and we will send you a URL
            to reset your password!
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          >
            <div>
              <Input
                value={value}
                type="email"
                placeholder="Enter your email..."
                variant="bordered"
                isInvalid={isInvalid}
                color={isInvalid ? "danger" : "success"}
                errorMessage="Please enter a valid email"
                onValueChange={setValue}
                size="lg"
              />
            </div>
            <button
              type="submit"
              className="group relative z-10 h-11 w-full overflow-hidden bg-primary text-white rounded-full text-center font-semibold text-lg"
            >
              <span className="absolute -inset-24 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
              <span className="absolute -inset-24 origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
              <span className="absolute -inset-24 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
              <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                {loading ? "" : "Reset Password"}
              </span>
              {loading ? (
                <ImSpinner6 className="animate-spin m-auto text-xl" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
