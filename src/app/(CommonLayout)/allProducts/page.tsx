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
import { ICategory } from "@/src/types/model";
import { GrCompare } from "react-icons/gr";
import { BiFilterAlt } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import Slider from "react-slider";

const AllProducts = () => {
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(4);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(7000);
  const [queryObj, setQueryObj] = useState({
    page: currentPage,
    limit: dataPerPage,
  });

  const { data: allCategories, isLoading } =
    useGetAllCategoriesQuery(undefined);

  // Debounce implementation using setTimeout for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm || category || sort) {
      setFilterApplied(true);
    } else {
      setFilterApplied(false);
    }
  }, [searchTerm, category, sort]);

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

  const handleSliderChange = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  console.log(searchTerm);

  return (
    <div>
      {/* Filter part */}
      <div className="flex flex-col xl:flex-row items-center my-5 p-4 border rounded-md border-primary shadow md:w-[95%] mx-auto gap-4">
        <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <div className="flex-1 w-full flex flex-col lg:flex-row gap-5 items-center">
          <div className=" flex lg:justify-start items-center w-full lg:w-96 xl:w-80">
            <button className="flex gap-2 justify-center items-center rounded-2xl border-2 border-primary text-primary py-2 px-3 font-medium w-full xl:w-auto">
              <span>
                <GrCompare className="text-xl text-primary" />
              </span>
              <span>Compare Products</span>
            </button>
          </div>
          <div className=" space-y-3 mt-3 w-full">
            <Slider
              className="slider"
              min={500}
              max={7000}
              step={10} // adjust step value for finer control
              value={[minPrice, maxPrice]}
              onChange={handleSliderChange}
            />

            <p className="xl:text-xl font-medium text-primary text-center">
              Price Range: ${minPrice} - ${maxPrice}
            </p>
          </div>
        </div>
      </div>

      {/* Filter show part */}

      {filterApplied && (
        <div className="border border-primary mt-4 p-4 flex gap-3 items-center md:w-[95%] mx-auto rounded-md shadow">
          <p className="font-semibold text-primary">Filtered By:</p>
          <div
            onClick={() => setSearchTerm("")}
            className="flex flex-wrap gap-2"
          >
            {debouncedSearchTerm && (
              <span className="bg-gray-200 px-3 py-2 rounded flex gap-2 items-center">
                <span>{debouncedSearchTerm}</span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
            {category && (
              <span
                onClick={() => setCategory("")}
                className="bg-gray-200 px-3 py-2 rounded flex gap-2 items-center"
              >
                <span>{category}</span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
            {sort && (
              <span
                onClick={() => setSort("")}
                className="bg-gray-200 px-3 py-2 rounded flex gap-2 items-center"
              >
                <span>{sort}</span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
            <button
              className="px-3 py-2 flex items-center gap-2 text-primary border border-primary rounded-2xl"
              onClick={() => {
                setSearchTerm("");
                setCategory("");
                setSort("");
                setFilterApplied(false);
              }}
            >
              <span>
                <BiFilterAlt className="text-lg" />
              </span>
              <span>Clear All</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
