"use client";

import { Key, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useGetAllCategoriesQuery } from "@/src/lib/redux/features/category/categoryApi";
import { ICategory } from "@/src/types/model";
import { GrCompare } from "react-icons/gr";

const AllProducts = () => {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const { data: allCategories, isLoading } =
    useGetAllCategoriesQuery(undefined);

  const handleCategorySelect = (key: Key) => {
    setCategory(String(key));
    // setPage(1);
    // setPosts([]);
  };

  const handleSortSelect = (key: Key) => {
    setSort(String(key));
    // setPage(1);
    // setPosts([]);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center my-5 p-4 border rounded-md border-primary shadow md:w-[95%] mx-auto gap-4">
        <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-xl border-2 border-primary py-[6px] px-6 text-base font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-primary"
          />

          {/* Category filter part */}
          <div className="w-full">
            <Dropdown>
              <DropdownTrigger className="w-full">
                <Button
                  color="primary"
                  variant="bordered"
                  className="capitalize font-medium"
                >
                  {category || "Select Product Category"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Select Product Category"
                color="primary"
                variant="bordered"
                onAction={handleCategorySelect}
              >
                {allCategories?.map((category: ICategory) => (
                  <DropdownItem key={category.name} className="text-white">
                    {category.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Sorting part */}
          <div className="w-full md:w-32">
            <Dropdown>
              <DropdownTrigger className="w-full">
                <Button
                  color="primary"
                  variant="bordered"
                  className="capitalize font-medium"
                >
                  Sort By Price
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort Posts"
                color="primary"
                variant="bordered"
                onAction={handleSortSelect} // Handle sort selection
              >
                <DropdownItem key="asc" className="text-white">
                  Low to High
                </DropdownItem>
                <DropdownItem key="desc" className="text-white">
                  High to Low
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="flex lg:justify-end items-center w-full">
            <button className="flex gap-2 justify-center items-center rounded-2xl border-2 border-primary text-primary py-2 px-3 font-medium w-full lg:w-auto">
              <span>
                <GrCompare className="text-xl text-primary" />
              </span>
              <span>Compare Products</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
