import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Company } from "../infra/prisma/entities/Company";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";

interface IRequest {
    name: string;
    cnpj: string;
    category: string;
    description: string;
    physical_localization: boolean,
    user_id: string;
}

@injectable()
export class CreateCompanyService {

    constructor(
        @inject("CompaniesRepository")
        private companyRepository: ICompaniesRepository,

        @inject("UsersRepository")
        private userRepository: IUsersRepository,
    ) { }

    public async execute({
        name,
        cnpj,
        category,
        description,
        physical_localization,
        user_id,
    }: IRequest): Promise<Company> {

        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError("This user does not exist");
        }

        const checkCompanyExists = await this.companyRepository.findByName(name);

        if (checkCompanyExists) {
            throw new AppError("Company already exists");
        }

        const company = await this.companyRepository.create({
            name,
            cnpj,
            category,
            description,
            physical_localization,
            user_id
        });

        return company;
    }

}