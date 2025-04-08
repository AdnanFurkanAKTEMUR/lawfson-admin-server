import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdminUser } from "./AdminUser";
import { Product } from "./Product";
import { Message } from "./Message";
import { JobOrder } from "./JobOrder";
import { ReportProduct } from "./ReportProduct";
import { CompanyFinanceInfo } from "./CompanyFinanceInfo";
import { CompanyAddress } from "./CompanyAddress";

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

  @Column({ nullable: true })
  companyTaxNumber?: string;

  @Column({ nullable: true })
  companyTaxOffice?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  registrationNumber?: string; // ticari sicil numarası

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  sector?: string;

  @Column({ nullable: true })
  companyType?: string; // şirket türü

  @Column({ nullable: true })
  website?: string;

  @OneToMany(() => AdminUser, (adminuser) => adminuser.company, { nullable: true })
  adminUsers?: AdminUser[];

  @OneToMany(() => JobOrder, (jobOrder) => jobOrder.company, { nullable: true })
  jobOrders?: JobOrder[];

  @OneToMany(() => CompanyFinanceInfo, (cfi) => cfi.company, { nullable: true })
  companyFinanceInfos?: CompanyFinanceInfo[];

  @OneToMany(() => CompanyAddress, (ca) => ca.company, { nullable: true })
  companyAddresses?: CompanyAddress[];

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
