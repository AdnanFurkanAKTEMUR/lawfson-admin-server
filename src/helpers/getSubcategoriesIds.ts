import { Category } from "@entities/Category";

const getAllSubcategoryIds = (category: Category): number[] => {
  let ids = [category.id];
  if (category.subcategories) {
    category.subcategories.forEach((subCategory) => {
      ids = ids.concat(getAllSubcategoryIds(subCategory));
    });
  }
  return ids;
};
export default getAllSubcategoryIds;
