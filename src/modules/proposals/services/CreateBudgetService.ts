
import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";
import { AppError } from "@shared/errors/AppError";

import { IDateProvider } from "@shared/container/providers/DateProvider/models/IDateProvider";
import { getBudgetFiles } from "@shared/utils/getFilesUrl";
import { Budget } from "../infra/prisma/entities/Budget";
import { IBudgetsRepository } from "../repositories/IBudgetsRepository";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

interface IRequest {
  proposal_id: string;
  description: string;
  delivery_date: Date;
  amount: number;
  installments: number;
}

@injectable()
export class CreateBudgetService {
  constructor(
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository,
    @inject("BudgetsRepository")
    private budgetRepository: IBudgetsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) { }

  public async execute({
    proposal_id,
    description,
    delivery_date,
    amount,
    installments
  }: IRequest): Promise<Budget> {
    const proposal = await this.proposalRepository.findProposalById(proposal_id);

    if (!proposal) {
      throw new AppError("Proposal not found");
    }

    const budgetAlreadyExists = await this.budgetRepository.findBudgetByProposal(proposal_id);

    if (budgetAlreadyExists) {
      throw new AppError("Budget already exists");
    }

    const templatePath = resolve(__dirname, "..", "views", "emails", "createdBudget.hbs");

    const budget = await this.budgetRepository.create({
      proposal_id,
      customer_id: proposal.customer_id,
      company_id: proposal.company_id,
      description,
      delivery_date: new Date(delivery_date),
      amount,
      installments
    });

    await this.proposalRepository.updateStatus(budget.proposal_id, "Orçamento enviado (Aguardando resposta)");

    const variables = {
      user: proposal.customer.user.name,
      company: proposal.company.name,
      objective: proposal.objective,
      description: proposal.description,
      proposal: budget.description,
      delivery_date: this.dateProvider.convertToNacionalFormat(budget.delivery_date),
      amount: budget.amount,
      installments: budget.installments,
      installmentsAmount: (budget.amount / budget.installments),
      createdAt: this.dateProvider.convertToNacionalFormat(budget.createdAt),
      link: `${process.env.APP_WEB_URL}/budget/details/${proposal.id}`,
      company_email: proposal.company.contact.email,
      company_telephone: proposal.company.contact.telephone,
      company_whatsapp: proposal.company.contact.whatsapp,
      company_website: proposal.company.contact.website
    };

    const email = proposal.customer.user.email;

    await this.mailProvider.sendMail(
      email,
      `Novo orçamento recebido de ${proposal.company.name}`,
      variables,
      templatePath
    );

    const returnBudget = {
      ...budget,
      files: getBudgetFiles(budget, "budget")
    }


    return returnBudget;

  }
}