import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./Company";

export enum UserRole {
  Regular = "regular",
  Admin = "admin",
  SuperAdmin = "superadmin",
}

@Entity()
export class AdminUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.Regular,
  })
  role: UserRole;

  @Column()
  password!: string;

  @Column({ nullable: true })
  phone?: string;

  @ManyToOne(() => Company, (company) => company.adminUsers)
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
