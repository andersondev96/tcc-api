
export interface ICreateEntrepreneurSettingsDTO {
  id?: string;
  entrepreneur_id: string;
  service_name_color?: string;
  service_price_color?: string;
  card_color?: string;
  highlight_services_quantity?: number;
  online_budget?: boolean;
  online_chat?: boolean;
  email_notification?: boolean;
}