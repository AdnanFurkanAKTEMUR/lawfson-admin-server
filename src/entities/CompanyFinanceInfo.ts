import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Company } from "./Company";

@Entity()
export class CompanyFinanceInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  billingAddress?: string;

  @Column({ nullable: true })
  billingPhone?: string;

  @Column({ nullable: true })
  billingEmail?: string;

  @Column({ nullable: true })
  billingCountry?: string;

  @Column({ nullable: true })
  billingCity?: string;

  @Column({ nullable: true })
  billingDistrict?: string;

  @Column({ nullable: true })
  billingPostalCode?: string;

  @Column({ nullable: true })
  iban?: string;
  @Column({ nullable: true })
  bankName?: string;

  @Column({ nullable: true })
  currency?: string;

  @ManyToOne(() => Company, (company) => company.companyFinanceInfos)
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
