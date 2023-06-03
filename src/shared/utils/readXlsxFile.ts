
import xlsx from "xlsx";

import { Category } from "@modules/categories/infra/prisma/entities/Category";

export function readXlsxFile(filePath: string): Category[] {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  return data as Category[];
}