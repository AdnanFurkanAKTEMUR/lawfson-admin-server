//type 0 biz, type 1 companyUser type 2 truckeruser
import { DataSource } from "typeorm";

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: number;
};

export type Context = {
  user: User | null;
  req: Request;
  res: Response;
  SqlConnection: DataSource;
};
