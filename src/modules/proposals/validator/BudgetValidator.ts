import { Joi, Segments } from "celebrate";

import { customMessage } from "@shared/utils/errors";

const BudgetValidator = {
  [Segments.BODY]: Joi.object().keys({
    description: Joi.string().required().messages(customMessage("description")),
    amount: Joi.date().required().messages(customMessage("delivery_date")),
    delivery_date: Joi.number().required().messages(customMessage("delivery_date")),
    installments: Joi.number().required().messages(customMessage("installments"))
  })
};

export { BudgetValidator };
