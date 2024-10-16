import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Product } from "@entities/Product";
import { Category } from "@entities/Category";
import { AdminUser } from "@entities/AdminUser";
import { Company } from "@entities/Company";

dotenv.config();

export default new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_CONNECTION_STRING,
  entities: [Product, Category, AdminUser, Company],
  synchronize: true,
});
