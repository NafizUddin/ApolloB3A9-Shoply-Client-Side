"use client";

import { Key, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useGetAllCategoriesQuery } from "@/src/lib/redux/features/category/categoryApi";
import { ICategory, IProduct } from "@/src/types/model";
import { GrCompare } from "react-icons/gr";
import { BiFilterAlt } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import Slider from "react-slider";
import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/productApi";
import ProductLoading from "@/src/components/LoadingCards/ProductLoading";
import HomeProductCard from "@/src/components/Cards/HomeProductCard";
import { Pagination } from "@nextui-org/pagination";
import { useSearchParams } from "next/navigation";

const FlashSale = () => {
  return (
    <div>
      <h1>Hello, FlashSale </h1>
    </div>
  );
};

export default FlashSale;
