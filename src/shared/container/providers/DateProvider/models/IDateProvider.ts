export interface IDateProvider {
  convertToUTC(date: Date): string;
  convertToNacionalFormat(date: Date): string;
  dateNow(): Date;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIsBefore(start_date: Date, end_date: Date): boolean;
}
