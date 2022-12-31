export interface ICreateAssessmentDTO {
  id?: string;
  user_id: string;
  table_id: string;
  comment: string;
  stars?: number;
}