import { ICreateScheduleDTO } from "../dtos/ICreateScheduleDTO";
import { Schedule } from "../infra/prisma/entities/Schedule";

export interface ISchedulesRepository {

    /**
   * @description Cadastra um novo horário de funcionamento
   * @param data ICreateScheduleDTO interface que fornece os atributos necessários para o cadastro
   */
    create(data: ICreateScheduleDTO): Promise<Schedule>;

    /**
     * @description Busca e exibe todos os horários de funcionamento da empresa que possui o id informado
     * @param company_id ID da empresa
     */
    findSchedulesByCompany(company_id: string): Promise<Schedule[]>;

    /**
     * @description Busca e exibe o horário de funcionamento do horário cadastrado pelo id
     * @param id string ID do horário de funcionamento
     */
    findById(id: string): Promise<Schedule>;

    /**
     * @description Atualiza os dados do horário de funcionamento cadatrado
     * @param data ICreateScheduleDTO cada campo do horário de funcionamento
     */
    update(data: ICreateScheduleDTO): Promise<Schedule>;

    /**
     * @description Remove um único horário de funcionamento cadastado, pelo id da tabela
     * @param id string ID do horário cadastrado
     */
    deleteUniqueSchedule(id: string): Promise<void>;

    /**
     * @description Remove todos horários de funcionamento da empresa do banco de dados, pelo id da empresa
     * @param company_id string ID da empresa
     */
    deleteAllSchedules(company_id: string): Promise<void>;
}