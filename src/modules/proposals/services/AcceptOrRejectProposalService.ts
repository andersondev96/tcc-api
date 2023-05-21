import Handlebars from "handlebars";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { IEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursSettingsRepository";
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";
import { AppError } from "@shared/errors/AppError";

import { Proposal } from "../infra/prisma/entities/Proposal";
import { IBudgetsRepository } from "../repositories/IBudgetsRepository";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

@injectable()
export class AcceptOrRejectProposalService {

  constructor(
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository,
    @inject("BudgetsRepository")
    private budgetRepository: IBudgetsRepository,
    @inject("EntrepreneursSettingsRepository")
    private entrepreneurSettingsRepository: IEntrepreneursSettingsRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) { }

  public async execute(proposal_id: string, status: string): Promise<Proposal> {
    const proposalAlreadyExists = await this.proposalRepository.findProposalById(proposal_id);

    if (!proposalAlreadyExists) {
      throw new AppError("Proposal not found");
    }

    if (status === "accept") {
      status = "Proposta aceita";
    } else if (status === "reject") {
      status = "Proposta rejeitada";
    } else {
      throw new AppError("Response invalid");
    }

    const proposal = await this.proposalRepository.updateStatus(proposal_id, status);

    const templatePath = resolve(__dirname, "..", "views", "emails", "acceptedOrRejectProposal.hbs");

    Handlebars.registerHelper("isEqual", function (status, options) {
      if (status == "Proposta aceita") {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });

    if (proposal) {
      const settings = await this.entrepreneurSettingsRepository.findByCompany(proposal.company_id);

      console.log(settings);

      const budget = await this.budgetRepository.findBudgetByProposal(proposal.id);

      if (settings.email_notification) {
        const variables = {
          name: proposal.company.name,
          status,
          user: proposal.customer.user.name,
          objective: proposal.objective,
          description: proposal.description,
          budget: budget.description,
          amount: budget.amount,
          link: `${process.env.APP_WEB_URL}/admin/budget/details/${proposal.id}`
        };

        const email = proposal.company.user.email;

        await this.mailProvider.sendMail(
          email,
          `${status === "Proposta aceita" ?
            "Proposta de orçamento aceita" :
            "Proposta de orçamento recusada"
          }`,
          variables,
          templatePath
        );
      }
    }

    return proposal;
  }
}