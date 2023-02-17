import { Category } from "@prisma/client";

export interface IXlsxProvider {

  readXlsxProvider(filePath: string): Promise<Category[]>;

}