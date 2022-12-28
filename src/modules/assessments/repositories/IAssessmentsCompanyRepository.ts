import { ICreateAssessmentDTO } from "../dtos/ICreateAssessmentDTO";
import { AssessmentCompany } from "../infra/prisma/entities/AssessmentCompany";

export interface IAssessmentsCompanyRepository {
  /**
   * @description Enviar um comentário sobre uma company
   * @param data ICreateAssessmentDTO -  Atributos necessários para inserir um comentário
   * @return AssessmentsCompany - Retorna o model com o comentário
   */
  create(data: ICreateAssessmentDTO): Promise<AssessmentCompany>;

  /**
   * @description Exibe todos os comentários de uma company
   * @param company_id string - id da company
   * @return AssessmentsCompany[] - Retorna o array com o model com os comentários de uma company
   */
  findAssessmentsByCompany(company_id: string): Promise<AssessmentCompany[]>;
}