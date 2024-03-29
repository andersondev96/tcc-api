import { IDateProvider } from "../models/IDateProvider";

export class FakeDateProvider implements IDateProvider {

  convertToUTC(date: Date): string {
    return date.toUTCString();
  }

  convertToNacionalFormat(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  }

  dateNow(): Date {
    return new Date();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const diff = end_date.getTime() - start_date.getTime();

    return diff / (1000 * 3600);
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const diff = end_date.getTime() - start_date.getTime();

    return diff / (1000 * 3600 * 24);
  }

  addDays(days: number) {
    const dateTime = new Date().getTime();
    return new Date(dateTime + 1000 * 3600 * 24 * days);
  }

  addHours(hours: number): Date {
    const dateTime = new Date().getTime();
    return new Date(dateTime + 1000 * 3600 * 24 * hours);
  }

  compareIsBefore(start_date: Date, end_date: Date): boolean {
    return end_date.getTime() < start_date.getTime();
  }

}