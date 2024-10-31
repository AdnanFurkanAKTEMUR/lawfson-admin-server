import { AdminUser } from "@entities/AdminUser";
import { ActionType, TableName, SystemLog } from "@entities/SystemLog";

export default async function createLog(action: ActionType, tableName: TableName, adminUserId: number) {
  const adminUser = await AdminUser.findOne({ where: { id: adminUserId } });
  if (!adminUser) throw new Error("Admin user not found");

  const logCreate = SystemLog.create({
    action: action,
    tableName: tableName,
    adminUser: adminUser,
  });

  await logCreate.save();
}
