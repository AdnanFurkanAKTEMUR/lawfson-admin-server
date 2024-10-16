import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdminUser } from "./AdminUser";
import { Product } from "./Product";
import { Message } from "./Message";

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

  @OneToMany(() => Product, (product) => product.company, { nullable: true })
  products?: Product[];

  @OneToMany(() => Message, (message) => message.company, { nullable: true })
  messages?: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
