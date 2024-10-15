import { Context } from "@contextTypes/contextTypes";
import { Product } from "@entities/Product";

const ProductResolver = {
  Query: {
    getProduct: async (_parent: any, args: any, context: Context, _info: any): Promise<Product | null> => {
      const { id } = args.input;
      const { user } = context;
      console.log(user, "user");
      try {
        const product = await Product.findOne({
          where: { id },
          relations: ["category"],
        });
        return product;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default ProductResolver;
