import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { AppUser } from "./AppUser";
import { Company } from "./Company";

@Entity()
export class ReportProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  note!: string;

  @ManyToOne(() => Product, (product) => product.reports)
  reportedProduct: Product;

  @ManyToOne(() => AppUser, (appUser) => appUser.reportedProducts)
  appUser: AppUser;

  @ManyToOne(() => Company, (company) => company.reportedProducts)
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
