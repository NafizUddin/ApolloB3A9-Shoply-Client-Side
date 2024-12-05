export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Shoply",
  description:
    "Shoply is a comprehensive e-commerce platform that offers an exceptional online shopping experience for users, vendors, and administrators. It allows users to browse and purchase a variety of products, vendors to manage their shops and inventories, and administrators to oversee and maintain the entire system efficiently.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/allProducts",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Login",
      href: "/login",
    },
  ],
};
