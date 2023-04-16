import { Entrepreneur } from "./Entrepreneur";

export class EntrepreneurSettings {
  id?: string;
  entrepreneur_id: string;
  company_logo?: string;
  highlight_services_quantity?: number;
  online_budget?: boolean;
  online_chat?: boolean;
  email_notification?: boolean;
  entrepreneur?: Entrepreneur;

  constructor({ entrepreneur_id, entrepreneur }: EntrepreneurSettings) {
    Object.assign(this, {
      entrepreneur_id,
      entrepreneur
    });
  }
}