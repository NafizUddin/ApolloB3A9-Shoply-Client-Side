"use client";

import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import { useCategories } from "@/src/hooks/CustomHooks/useCategories";

const CategoryManagement = () => {
  const { categories } = useCategories();

  return (
    <div>
      <DashboardSectionTitle heading="Product Category Management" />
    </div>
  );
};

export default CategoryManagement;
