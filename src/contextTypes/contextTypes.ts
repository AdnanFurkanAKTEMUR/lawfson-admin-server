//type 0 biz, type 1 companyUser type 2 truckeruser
import { DataSource } from "typeorm";

export type User = {
  id: number;
  userName: string;
  companyId: number;
  companyName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type Context = {
  user: User | null;
  req: Request;
  res: Response;
  SqlConnection: DataSource;
};
