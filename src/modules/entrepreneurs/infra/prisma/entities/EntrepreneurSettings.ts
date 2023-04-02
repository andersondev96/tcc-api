
export class EntrepreneurSettings {
  id?: string;
  entrepreneur_id: string;
  company_logo?: string;
  highlight_services_quantity?: number;
  online_budget?: boolean;
  online_chat?: boolean;
  email_notification?: boolean;

  constructor({ entrepreneur_id }: EntrepreneurSettings) {
    Object.assign(this, {
      entrepreneur_id
    });
  }
}