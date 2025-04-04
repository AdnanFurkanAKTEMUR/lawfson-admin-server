import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";
import { Message } from "./Message";
import { Company } from "./Company";
import { AppUserFavoriteProduct } from "./AppUserFavoriteProduct";
import { ReportProduct } from "./ReportProduct";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productName: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ type: "text", array: true, nullable: true })
  images: string[] | null;

  @Column({ type: "int", nullable: true })
  clickedRate: number | null;

  @Column({ type: "varchar", nullable: true })
  widths: string | null;

  @Column({ type: "varchar", nullable: true })
  length: string | null;

  @Column({ type: "varchar", nullable: true })
  thickness: string | null;

  @Column({ type: "varchar", nullable: true })
  color: string | null;

  @Column({ type: "varchar", nullable: true })
  origin: string | null;

  @Column({ type: "varchar", nullable: true })
  surfaceTreatment: string | null;

  @Column({ type: "varchar", nullable: true })
  description: string | null;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price: number | null;

  @Column({ type: "boolean", default: false })
  inStock: boolean; // 🆕 Varsayılan olarak false (önceki kayıtları etkilemez)

  @Column({ type: "boolean", default: false })
  onAd: boolean;

  @Column({ type: "varchar", nullable: true })
  country: string | null;

  @Column({ type: "varchar", nullable: true })
  city: string | null;

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

  @OneToMany(() => AppUserFavoriteProduct, (aufp) => aufp.product, { nullable: true })
  onFavorites: AppUserFavoriteProduct[] | null;

  @OneToMany(() => ReportProduct, (report) => report.reportedProduct, { nullable: true })
  reports: ReportProduct | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
