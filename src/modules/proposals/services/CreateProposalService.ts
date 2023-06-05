import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { ICustomersCompaniesRepository } from "@modules/customers/repositories/ICustomersCompaniesRepository";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { IEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursSettingsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";
import { AppError } from "@shared/errors/AppError";

import { getUserAvatarUrl } from "@shared/utils/getFilesUrl";
import { Proposal } from "../infra/prisma/entities/Proposal";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

interface IRequest {
  objective: string;
  time?: Date;
  description?: string;
  telephone?: string;
  company_id: string;
  user_id: string;
}

@injectable()
export class CreateProposalService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("CustomersRepository")
    private customerRepository: ICustomersRepository,
    @inject("CustomersCompaniesRepository")
    private customerCompanyRepository: ICustomersCompaniesRepository,
    @inject("EntrepreneursSettingsRepository")
    private entrepreneurSettingsRepository: IEntrepreneursSettingsRepository,
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) { }

  public async execute({ objective, time, description, telephone, company_id, user_id }: IRequest): Promise<Proposal> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const templatePath = resolve(__dirname, "..", "views", "emails", "proposalSolicited.hbs");

    const user = await this.usersRepository.findById(user_id);

    if (user) {
      let customer = await this.customerRepository.findCustomerByUser(user.id);

      if (!customer) {
        customer = await this.customerRepository.create({
          user_id,
          telephone,
          status: "Em negociação"
        });

      } else {

        const customerCompanyAlreadyExists = await this.customerCompanyRepository.findCompanyWithCustomer(
          company_id,
          customer.id
        );

        if (!customerCompanyAlreadyExists) {
          await this.customerCompanyRepository.create({
            company_id,
            customer_id: customer.id
          });
        }

      }

      const proposal = await this.proposalRepository.create({
        objective,
        time,
        description,
        company_id,
        status: "Aguardando orçamento",
        customer_id: customer.id
      });

      console.log(proposal);

      if (proposal) {
        const settings = await this.entrepreneurSettingsRepository.findByCompany(proposal.company_id);

        if (settings.email_notification) {
          const variables = {
            name: proposal.company.name,
            user: user.name,
            objective: proposal.objective,
            description: proposal.description,
            link: `${process.env.APP_WEB_URL}/admin/budget/details/${proposal.id}`
          };

          const email = proposal.company.user.email;

          await this.mailProvider.sendMail(
            email,
            "Nova proposta recebida",
            variables,
            templatePath
          );
        }

      }

      return {
        ...proposal,
        customer: {
          ...proposal.customer,
          user: {
            ...proposal.customer.user,
            avatar: getUserAvatarUrl(user, "avatar")
          }
        }
      };
    }

  }
}