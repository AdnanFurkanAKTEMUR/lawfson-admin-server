import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Message } from "./Message";
import { Company } from "./Company";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productName: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  category?: Category;

  @OneToMany(() => Message, (message) => message.product, { nullable: true })
  messages?: Message[];

  @ManyToOne(() => Company, (company) => company.products)
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
