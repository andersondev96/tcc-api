export interface ICreateScheduleDTO {
    day_of_week: string;
    opening_time: string;
    closing_time: string;
    company_id: string;
    id?: string;
}