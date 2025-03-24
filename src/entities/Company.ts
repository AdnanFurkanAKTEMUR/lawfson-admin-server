import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdminUser } from "./AdminUser";
import { Product } from "./Product";
import { Message } from "./Message";
import { JobOrder } from "./JobOrder";
import { ReportProduct } from "./ReportProduct";

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  companyName!: string;

  @Column({ unique: true })
  companyEmail!: string;

  @Column({ unique: true })
  companyPhone!: string;

  @OneToMany(() => AdminUser, (adminuser) => adminuser.company, { nullable: true })
  adminUsers?: AdminUser[];

  @OneToMany(() => JobOrder, (jobOrder) => jobOrder.company, { nullable: true })
  jobOrders?: JobOrder[];

  @OneToMany(() => Product, (product) => product.company, { nullable: true })
  products?: Product[];

  @OneToMany(() => Message, (message) => message.company, { nullable: true })
  messages?: Message[];

  @OneToMany(() => ReportProduct, (rp) => rp.company, { nullable: true })
  reportedProducts?: ReportProduct[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
