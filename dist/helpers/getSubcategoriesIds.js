"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAllSubcategoryIds = (category) => {
    let ids = [category.id];
    if (category.subcategories) {
        category.subcategories.forEach((subCategory) => {
            ids = ids.concat(getAllSubcategoryIds(subCategory));
        });
    }
    return ids;
};
exports.default = getAllSubcategoryIds;
//# sourceMappingURL=getSubcategoriesIds.js.map