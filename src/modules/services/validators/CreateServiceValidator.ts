import { Joi, Segments } from "celebrate";

import { customMessage } from "@shared/utils/errors";


const createServiceValidator = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().messages(customMessage("name")),
    description: Joi.string().required().messages(customMessage("description")),
    price: Joi.number().required().messages(customMessage("price")),
    highlight_service: Joi.boolean().messages(customMessage("highlight_service")),
    category: Joi.string().required().messages(customMessage("category"))
  })
};

export { createServiceValidator };