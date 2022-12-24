export class Schedule {
  id?: string;
  weekday: string;
  opening_time: string;
  closing_time: string;
  lunch_time?: string;
  company_id: string;

  constructor({
    weekday,
    opening_time,
    closing_time,
    company_id
  }: Schedule) {
    return Object.assign(this, {
      weekday,
      opening_time,
      closing_time,
      company_id
    });
  }
}