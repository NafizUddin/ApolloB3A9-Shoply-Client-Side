/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import logo from "@/src/assets/logo.png";
import Image from "next/image";

export default function Login() {
  const [isActive, setIsActive] = useState(false);

  console.log(isActive);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-10 xl:py-0">
      <div className="relative border-2 border-primary text-white rounded-2xl shadow-lg overflow-hidden w-[850px] max-w-full lg:min-h-[520px] min-h-[620px] md:min-h-[580px]">
        {/* Form Containers */}
        {/* Sign In Part */}
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-700 ${
            isActive
              ? "translate-x-full opacity-0 z-10"
              : "translate-x-0 opacity-100 z-20"
          } w-full lg:w-1/2`}
        >
          <div className="flex flex-col items-center justify-center h-full px-10 text-white">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                height={100}
                width={100}
                className="flex py-1"
              />
            </Link>
            <h1 className="text-2xl font-semibold my-5">Sign In</h1>
            <div className="flex space-x-3 mb-5">
              <a href="#" className="icon">
                <FaGoogle className="w-6 h-6 text-gray-600" />
              </a>
              <a href="#" className="icon">
                <FaFacebookF className="w-6 h-6 text-gray-600" />
              </a>
              <a href="#" className="icon">
                <FaGithub className="w-6 h-6 text-gray-600" />
              </a>
              <a href="#" className="icon">
                <FaLinkedinIn className="w-6 h-6 text-gray-600" />
              </a>
            </div>
            <span className="text-sm text-gray-500 mb-4">
              or use your email account
            </span>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 bg-gray-200 rounded-lg focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 bg-gray-200 rounded-lg focus:outline-none"
            />
            <a href="#" className="text-sm text-gray-600 mb-3">
              Forgot Your Password?
            </a>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg uppercase font-bold">
              Sign In
            </button>
          </div>
        </div>

        {/* Sign Up Part */}
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-700 ${
            isActive
              ? "translate-x-0 lg:translate-x-full opacity-100 z-20"
              : "translate-x-full lg:translate-x-0 opacity-100 lg:opacity-0 z-10"
          } w-full lg:w-1/2`}
        >
          <div className="flex flex-col items-center justify-center h-full px-10 text-white">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                height={100}
                width={100}
                className="flex py-1"
              />
            </Link>
            <h1 className="text-2xl font-semibold my-5">Create Account</h1>
            <div className="flex space-x-3 mb-5">
              <a href="#" className="icon">
                <FaGoogle className="w-6 h-6 text-gray-600" />
              </a>
              <a href="#" className="icon">
                <FaFacebookF className="w-6 h-6 text-gray-600" />
              </a>
              <a href="#" className="icon">
                <FaGithub className="w-6 h-6 text-gray-600" />
              </a>
              <a href="#" className="icon">
                <FaLinkedinIn className="w-6 h-6 text-gray-600" />
              </a>
            </div>
            <span className="text-sm text-gray-500 mb-4">
              or use your email for registration
            </span>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 mb-4 bg-gray-200 rounded-lg focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 bg-gray-200 rounded-lg focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 bg-gray-200 rounded-lg focus:outline-none"
            />
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg uppercase font-bold">
              Sign Up
            </button>
          </div>
        </div>

        {/* Toggle Panels */}
        <div
          className={`hidden absolute top-0 left-1/2 w-full h-1/2 md:h-full md:w-1/2 transition-all duration-700 bg-orange-500 text-white lg:flex flex-col items-center justify-center px-6 ${
            isActive
              ? "translate-x-[-100%] rounded-r-[30%]"
              : "translate-x-0 rounded-l-[30%]"
          }`}
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              {isActive ? "Welcome Back!" : "Welcome, Friend!"}
            </h1>
            <p className="mb-5">
              {isActive
                ? "Enter your personal details to sign in."
                : "Create your account to get started."}
            </p>
            <button
              onClick={() => setIsActive(!isActive)}
              className="px-6 py-2 bg-transparent border-2 border-white rounded-lg uppercase font-bold"
            >
              {isActive ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>

        {/* Mobile Toggle Text */}
        <div className="lg:hidden absolute bottom-5 left-1/2 transform  -translate-x-1/2 text-center z-50">
          <p>
            {" "}
            {isActive
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsActive(!isActive)}
              className="text-primary font-bold hover:underline"
            >
              {" "}
              {isActive ? "Login Now!" : "Sign Up Now!"}{" "}
            </button>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

// previous
