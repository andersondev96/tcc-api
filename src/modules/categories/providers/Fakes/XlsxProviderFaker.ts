import * as fs from "fs";
import * as XLSX from "xlsx";

import { IXlsxProvider } from "../XlsxProvider/models/IXlsxProvider";

export class XlsxProviderFaker implements IXlsxProvider {

  public async readXlsxProvider(filePath: string): Promise<any[]> {
    const fileContent = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileContent, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    return data;
  }

}