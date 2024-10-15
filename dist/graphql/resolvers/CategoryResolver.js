"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../../entities/Category");
const CategoryResolver = {
    Query: {
        getCategory: async (_parent, args, context, _info) => {
            const { id } = args.input;
            const { user } = context;
            console.log(user, "user");
            try {
                const category = await Category_1.Category.findOne({
                    where: { id },
                    relations: ["products"],
                });
                return category;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = CategoryResolver;
//# sourceMappingURL=CategoryResolver.js.map