import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdminUser } from "./AdminUser";
import { Company } from "./Company";

@Entity()
export class JobOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  note!: string;

  //atanan kişi idsi
  @ManyToOne(() => AdminUser, (adminUser) => adminUser.adminJobs)
  adminUser: AdminUser;

  @ManyToOne(() => AdminUser, (adminUser) => adminUser.createdAdminJobs)
  createdAdminUser: AdminUser;

  @ManyToOne(() => Company, (company) => company.jobOrders)
  company: Company;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
