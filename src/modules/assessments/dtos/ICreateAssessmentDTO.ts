export interface ICreateAssessmentDTO {
  user_id: string;
  company_id: string;
  comment: string;
  stars?: number;
}