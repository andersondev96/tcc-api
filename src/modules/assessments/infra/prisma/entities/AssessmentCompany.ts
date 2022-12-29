
export class AssessmentCompany {
  id?: string;
  user_id: string;
  company_id: string;
  comment: string;
  stars?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ user_id, company_id, comment }: AssessmentCompany) {
    return Object.assign(this, {
      user_id,
      company_id,
      comment
    });
  }
}