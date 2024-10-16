import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdminUser } from "./AdminUser";

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

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
