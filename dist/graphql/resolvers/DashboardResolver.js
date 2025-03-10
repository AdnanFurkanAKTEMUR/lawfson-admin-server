"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dashboard = {
    Query: {
        mostClickedThreeProductQuery: async (_parent, _args, context, _info) => {
            const { user } = context;
            if (!user || !user.companyId)
                throw new Error("Hata: Yetkisiz İşlem!");
            try {
            }
            catch (e) {
                throw new Error(e);
            }
        },
    },
    Mutation: {},
};
exports.default = Dashboard;
//# sourceMappingURL=DashboardResolver.js.map