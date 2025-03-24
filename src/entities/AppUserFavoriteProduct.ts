import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AppUser } from "./AppUser";
import { Product } from "./Product";

@Entity()
export class AppUserFavoriteProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => AppUser, (appUser) => appUser.favoriteProducts)
  appUser: AppUser;

  @ManyToOne(() => Product, (product) => product.onFavorites)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
