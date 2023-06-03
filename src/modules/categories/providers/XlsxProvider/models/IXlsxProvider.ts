
export interface IXlsxProvider {

  readXlsxProvider(filePath: string): Promise<any[]>;

}