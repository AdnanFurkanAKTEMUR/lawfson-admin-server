import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdminUser } from "./AdminUser";
import { Company } from "./Company";
import { Message } from "./Message";

@Entity()
export class AdminNote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
 
  @Column()
  note!: string;

  @ManyToOne(() => AdminUser, (adminUser) => adminUser.adminNotes)
  adminUser: AdminUser;

  @ManyToOne(() => Message, (message) => message.adminNotes)
  message: Message;

  @ManyToOne(() => Company, (company) => company.messages)
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
