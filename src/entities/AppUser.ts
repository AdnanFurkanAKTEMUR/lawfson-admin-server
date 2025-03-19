import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Message } from "./Message";

@Entity()
export class AppUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  phoneCode?: string;

  @Column({ nullable: true, default: 1 }) // Veritabanında default 1 olacak
  role?: number;

  @OneToMany(() => Message, (message) => message.appUser, { nullable: true })
  messages?: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
