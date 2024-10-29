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

  @Column({ nullable: true }) //not: aşağıda ki nullable yapı ile bu aynı
  brand?: string;

  //resim
  @Column({ type: "varchar", nullable: true })
  image: string | null;

  //en
  @Column({ type: "varchar", nullable: true })
  widths: string | null;

  //boy
  @Column({ type: "varchar", nullable: true })
  length: string | null;

  //kalınlık
  @Column({ type: "varchar", nullable: true })
  thickness: string | null;

  //renk
  @Column({ type: "varchar", nullable: true })
  color: string | null;

  //menşei
  @Column({ type: "varchar", nullable: true })
  origin: string | null;

  //yüzey işlemi
  @Column({ type: "varchar", nullable: true })
  surfaceTreatment: string | null;

  //Açıklama
  @Column({ type: "varchar", nullable: true })
  description: string | null;

  //ilana konulsun mu
  @Column({ type: "boolean", default: false })
  onAd: boolean;

  //Konum
  @Column({ type: "varchar", nullable: true })
  location: string | null;

  //İlan Tarihi
  @Column({ type: "date", nullable: true })
  adDate: Date | null;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  category: Category | null;

  @OneToMany(() => Message, (message) => message.product, { nullable: true })
  messages: Message[] | null;

  @ManyToOne(() => Company, (company) => company.products)
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
