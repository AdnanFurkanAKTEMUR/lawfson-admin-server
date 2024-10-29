import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./Company";
import { Message } from "./Message";

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

  @Column({ nullable: true })
  isRoot?: boolean;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.Regular,
  })
  role: UserRole;

  @Column()
  password!: string;

  @Column({ type: "varchar", nullable: true })
  phone: string | null;

  @ManyToOne(() => Company, (company) => company.adminUsers)
  company: Company;

  @OneToMany(() => Message, (message) => message.returnedAdmin, { nullable: true })
  returnedMessages?: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
