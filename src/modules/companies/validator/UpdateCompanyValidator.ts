import { Joi, Segments } from "celebrate";

import { customMessage } from "@shared/utils/errors";

const updateCompanyValidator = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().messages(customMessage("name")),
    cnpj: Joi.string().required().min(11).messages(customMessage("cnpj")),
    category: Joi.string().required().messages(customMessage("category")),
    description: Joi.string().messages(customMessage("description")),
    services: Joi.array().min(1).max(5).messages(customMessage("services")),
    physical_localization: Joi.boolean().required().messages(customMessage("physical_localization")),
    telephone: Joi.string().required().min(11).messages(customMessage("telephone")),
    email: Joi.string().email().required().messages(customMessage("email")),
    whatsapp: Joi.string().min(11).messages(customMessage("whatsapp")),
    website: Joi.string().uri().messages(customMessage("website")),
    address: {
      cep: Joi.string().min(11).required().messages(customMessage("cep")),
      street: Joi.string().required().messages(customMessage("street")),
      district: Joi.string().required().messages(customMessage("district")),
      number: Joi.number().required().messages(customMessage("number")),
      state: Joi.string().required().messages(customMessage("state")),
      city: Joi.string().required().messages(customMessage("city"))
    }
  })
};

export { updateCompanyValidator };