import { Context } from "@contextTypes/contextTypes";

const Dashboard = {
  Query: {
    mostClickedThreeProductQuery: async (_parent: any, _args: any, context: Context, _info: any) => {
      const { user } = context;
      if (!user || !user.companyId) throw new Error("Hata: Yetkisiz İşlem!");
      try {
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {},
};

export default Dashboard;
