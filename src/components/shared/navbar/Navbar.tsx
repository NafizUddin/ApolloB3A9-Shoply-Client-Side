"use client";

import { Link as NextUILink } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/src/config/site";
import logo from "@/src/assets/logo.png";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import NavbarUserDropdown from "./NavbarUserDropdown";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import CartDrawer from "../../CartDrawer/CartDrawer";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { totalProductsCount } from "@/src/lib/redux/features/products/productSlice";

export default function Navbar() {
  const pathname = usePathname();
  const { userData, isLoading } = useUserDetails();
  const totalProductInCart = useAppSelector(totalProductsCount);

  return (
    <>
      <NextUINavbar
        maxWidth="xl"
        position="sticky"
        className="pt-2 pb-1 lg:pb-4"
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:-bottom-3",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[3px]",
            "data-[active=true]:after:rounded-[3px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarBrand className="mt-3">
          <div className="lg:hidden">
            <NavbarMenuToggle />
          </div>
          {/* <Image
          src={logo}
          alt="logo"
          height={80}
          width={80}
          className="hidden lg:flex py-1"
        /> */}
          <div className="hidden lg:flex gap-6">
            {siteConfig.navItems.map((item) => (
              <NavbarItem
                className={`text-lg ${pathname === item.href ? "text-primary" : "text-white"}`}
                key={item.label}
                isActive={pathname === item.href}
              >
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </div>
        </NavbarBrand>

        <NavbarContent justify="center">
          {/* <div className="hidden lg:flex gap-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem
              className={`text-lg ${pathname === item.href ? "text-primary" : "text-white"}`}
              key={item.label}
              isActive={pathname === item.href}
            >
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div> */}
          <Image
            src={logo}
            alt="logo"
            height={80}
            width={80}
            className="hidden lg:flex py-1 mt-2"
          />
          <Image
            src={logo}
            alt="logo"
            height={80}
            width={70}
            className="flex lg:hidden mt-5"
          />
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="flex gap-4 items-center">
            <IoSearch className="text-white text-2xl cursor-pointer" />

            <div className="drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content mr-3 relative">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer-button relative">
                  <MdOutlineShoppingCart className="text-white text-2xl cursor-pointer" />
                  {totalProductInCart > 0 && (
                    <span className="absolute top-0 right-0 mt-[-8px] mr-[-8px] flex items-center justify-center w-5 h-5 bg-primary text-white text-xs rounded-full">
                      {totalProductInCart}
                    </span>
                  )}
                </label>
              </div>
              <div className="drawer-side z-20">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                />
                <CartDrawer />
              </div>
            </div>

            {isLoading ? (
              <div className="animate-pulse w-10 h-10 rounded-full bg-gray-400" />
            ) : userData ? (
              <NavbarUserDropdown user={userData} />
            ) : (
              <Link href="/login">
                <div className="hidden md:block">
                  <button className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
                    Login
                  </button>
                </div>
              </Link>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.label}-${index}`}>
                <NextUILink
                  color="primary"
                  href={item.href}
                  size="lg"
                  className="font-bold"
                >
                  {item.label}
                </NextUILink>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
}
