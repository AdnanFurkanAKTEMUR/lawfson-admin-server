"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createLog;
const AdminUser_1 = require("../entities/AdminUser");
const SystemLog_1 = require("../entities/SystemLog");
async function createLog(action, tableName, adminUserId) {
    const adminUser = await AdminUser_1.AdminUser.findOne({ where: { id: adminUserId } });
    if (!adminUser)
        throw new Error("Admin user not found");
    const logCreate = SystemLog_1.SystemLog.create({
        action: action,
        tableName: tableName,
        adminUser: adminUser,
    });
    await logCreate.save();
}
//# sourceMappingURL=createLog.js.map