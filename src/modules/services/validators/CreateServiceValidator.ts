import { Joi, Segments } from "celebrate";

import { customMessage } from "@shared/utils/errors";


const createServiceValidator = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().messages(customMessage('name')),
    description: Joi.string().required().messages(customMessage('description')),
    price: Joi.number().required().messages(customMessage('price')),
    category: Joi.string().required().messages(customMessage('category')),
  })
}

export { createServiceValidator };