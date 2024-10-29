import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdminUser } from "./AdminUser";

export enum ActionType {
  Delete = "delete",
  Create = "create",
  Read = "read",
  Update = "update",
}

export enum TableName {
  AdminNote = "AdminNote",
  AdminUser = "AdminUser",
  AppUser = "AppUser",
  Category = "Category",
  Company = "Company",
  Message = "Message",
  Product = "Product",
}

@Entity()
export class SystemLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: ActionType })
  action!: ActionType;

  @Column({ type: "enum", enum: TableName })
  tableName: TableName;

  @Column()
  before: string;

  @Column()
  later: string;

  @ManyToOne(() => AdminUser, (adminUser) => adminUser.systemLogs)
  adminUser: AdminUser;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
