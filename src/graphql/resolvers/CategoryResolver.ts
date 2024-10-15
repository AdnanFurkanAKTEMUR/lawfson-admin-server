import { Context } from "@contextTypes/contextTypes";
import { Category } from "@entities/Category";

const CategoryResolver = {
  Query: {
    getCategory: async (_parent: any, args: any, context: Context, _info: any): Promise<Category | null> => {
      const { id } = args.input;
      const { user } = context;
      console.log(user, "user");
      try {
        const category = await Category.findOne({
          where: { id },
          relations: ["products"],
        });
        return category;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

export default CategoryResolver;
