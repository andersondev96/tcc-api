import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { IServicesRepository } from "../repositories/IServicesRepository";

@injectable()
export class GetServiceHighlightService {

  constructor(
    @inject("ServicesRepository")
    private servicesRepository: IServicesRepository

  ) { }

  public async execute(service_id: string): Promise<void> {

    const service = await this.servicesRepository.findServiceById(service_id);

    // Verifica se highlight_service é verdadeiro e seta como falso
    if (service.highlight_service) {
      service.highlight_service = false;
    } else {

      const servicesByCompany = await this.servicesRepository.listServicesByCompany(service.company_id);

      let totHighlight = 0;

      // Conta a quantidade de serviços em destaque
      servicesByCompany.map((service) => {
        service.highlight_service === true && totHighlight++;
      });

      // Se houver mais de 5 em destaque vai dar erro
      if (totHighlight > 5) {
        throw new AppError("Quantity services highlight exceeds 5");
      } else { // Seta highlight_service como true
        service.highlight_service = true;
      }
    }

    // Atualiza no banco de dados
    await this.servicesRepository.update(service);

  }
}