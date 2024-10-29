import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AppUser } from "./AppUser";
import { AdminUser } from "./AdminUser";
import { Product } from "./Product";
import { Company } from "./Company";
import { AdminNote } from "./AdminNote";

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  messageHeader!: string;

  @Column()
  messageText!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ default: false })
  isReturn?: boolean;

  @ManyToOne(() => AdminUser, (adminUser) => adminUser.returnedMessages, { nullable: true })
  returnedAdmin?: AdminUser;

  @ManyToOne(() => AppUser, (appUser) => appUser.messages)
  appUser: AppUser;

  @ManyToOne(() => Product, (product) => product.messages)
  product: Product;

  @ManyToOne(() => Company, (company) => company.messages)
  company: Company;

  @OneToMany(() => AdminNote, (adminNote) => adminNote.message, { nullable: true })
  adminNotes?: AdminNote[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
