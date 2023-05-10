import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { IEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursSettingsRepository";
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";
import { AppError } from "@shared/errors/AppError";

import { Proposal } from "../infra/prisma/entities/Proposal";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

interface IRequest {
  proposal_id: string;
  objective: string;
  time?: Date;
  description?: string;
}


@injectable()
export class UpdateProposalService {

  constructor(
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository,
    @inject("EntrepreneursSettingsRepository")
    private entrepreneurSettingsRepository: IEntrepreneursSettingsRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) { }

  public async execute(data: IRequest): Promise<Proposal> {
    const proposalExists = await this.proposalRepository.findProposalById(data.proposal_id);

    if (!proposalExists) {
      throw new AppError("Proposal not found");
    }

    const templatePath = resolve(__dirname, "..", "views", "emails", "proposalSolicitedUpdated.hbs");

    const proposal = await this.proposalRepository.update({
      id: data.proposal_id,
      objective: data.objective,
      time: data.time,
      description: data.description,
      status: "Proposta atualizada pelo cliente",
      customer_id: proposalExists.customer_id,
      company_id: proposalExists.company_id
    });

    if (proposal) {
      const settings = await this.entrepreneurSettingsRepository.findByCompany(proposal.company_id);

      if (settings.email_notification) {
        const variables = {
          name: proposal.company.name,
          user: proposal.customer.user.name,
          objective: proposal.objective,
          description: proposal.description,
          link: `${process.env.APP_WEB_URL}/admin/budget/details/${proposal.id}`
        };

        const email = proposal.company.user.email;

        await this.mailProvider.sendMail(
          email,
          "Proposta atualizada",
          variables,
          templatePath
        );
      }

    }

    return proposal;
  }
}