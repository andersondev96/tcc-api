export interface ICreateScheduleDTO {
  id?: string;
  weekday: string;
  opening_time: string;
  closing_time: string;
  lunch_time?: string;
  company_id?: string;
}