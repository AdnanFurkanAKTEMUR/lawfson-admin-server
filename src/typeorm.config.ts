import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Product } from "@entities/Product";
import { Category } from "@entities/Category";
import { AdminUser } from "@entities/AdminUser";
import { Company } from "@entities/Company";
import { AppUser } from "@entities/AppUser";
import { Message } from "@entities/Message";
import { AdminNote } from "@entities/AdminNote";
import { JobOrder } from "@entities/JobOrder";
import { AppUserFavoriteProduct } from "@entities/AppUserFavoriteProduct";

dotenv.config();

export default new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_CONNECTION_STRING,
  entities: [Product, Category, AdminUser, Company, AppUser, Message, AdminNote, JobOrder, AppUserFavoriteProduct],
  synchronize: true,
});
