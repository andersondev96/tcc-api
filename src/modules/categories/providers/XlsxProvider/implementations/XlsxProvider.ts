import xlsx from "xlsx";

import { Category } from "@prisma/client";

import { IXlsxProvider } from "../models/IXlsxProvider";

export class XlsxProvider implements IXlsxProvider {
  public async readXlsxProvider(filePath: string): Promise<Category[]> {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    return data as Category[];
  }


}