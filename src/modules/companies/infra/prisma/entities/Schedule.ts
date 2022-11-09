export class Schedule {
    id?: string;
    day_of_week: string;
    opening_time: string;
    closing_time: string;
    company_id: string;

    constructor({
        day_of_week,
        opening_time,
        closing_time,
        company_id
    }: Schedule) {
        return Object.assign(this, {
            day_of_week,
            opening_time,
            closing_time,
            company_id
        })
    }
}