import { Joi, Segments } from "celebrate";

import { customMessage } from "@shared/utils/errors";

const schedule = Joi.object().keys({
  weekday: Joi.string().required().messages(customMessage("weekday")),
  opening_time: Joi.string().required().messages(customMessage("weekday")),
  closing_time: Joi.string().required().messages(customMessage("closing_time")),
  lunch_time: Joi.string().messages(customMessage("lunch_time"))
});

const companyValidator = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().messages(customMessage("name")),
    cnpj: Joi.string().required().min(11).messages(customMessage("cnpj")),
    category: Joi.string().required().messages(customMessage("category")),
    description: Joi.string().messages(customMessage("description")),
    services: Joi.array().min(1).max(5).messages(customMessage("services")),
    schedules: Joi.array().items(schedule).messages(customMessage("schedules")),
    physical_localization: Joi.boolean().required().messages(customMessage("physical_localization")),
    telephone: Joi.string().required().min(11).messages(customMessage("telephone")),
    email: Joi.string().email().required().messages(customMessage("email")),
    whatsapp: Joi.string().min(11).messages(customMessage("whatsapp")),
    website: Joi.string().uri().messages(customMessage("website")),
    cep: Joi.string().min(11).messages(customMessage("cep")),
    street: Joi.string().messages(customMessage("street")),
    district: Joi.string().messages(customMessage("district")),
    number: Joi.number().messages(customMessage("number")),
    state: Joi.string().messages(customMessage("state")),
    city: Joi.string().messages(customMessage("city"))
  })
};

export { companyValidator };