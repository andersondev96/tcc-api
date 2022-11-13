export interface ICreateScheduleDTO {
    id?: string;
    day_of_week: string;
    opening_time: string;
    closing_time: string;
    lunch_time?: string;
    company_id: string;
}