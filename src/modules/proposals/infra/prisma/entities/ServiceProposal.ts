
export class ServiceProposal {
  id?: string;
  service_id: string;
  proposal_id: string;
  customer_id: string;

  constructor({ service_id, proposal_id, customer_id }: ServiceProposal) {
    Object.assign(this, {
      service_id,
      proposal_id,
      customer_id
    });
  }
}