"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../../entities/Product");
const ProductResolver = {
    Query: {
        getProduct: async (_parent, args, context, _info) => {
            const { id } = args.input;
            const { user } = context;
            console.log(user, "user");
            try {
                const product = await Product_1.Product.findOne({
                    where: { id },
                    relations: ["category"],
                });
                return product;
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
};
exports.default = ProductResolver;
//# sourceMappingURL=ProductResolver.js.map