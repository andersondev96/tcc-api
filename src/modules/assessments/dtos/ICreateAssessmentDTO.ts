export interface ICreateAssessmentDTO {
  id?: string;
  user_id: string;
  company_id: string;
  comment: string;
  stars?: number;
}