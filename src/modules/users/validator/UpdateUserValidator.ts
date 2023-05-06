
import { Joi, Segments } from "celebrate";

import { customMessage } from "@shared/utils/errors";

const updateUserValidator = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().messages(customMessage("name")),
    email: Joi.string().email().required().messages(customMessage("email")),
    password: Joi.string().min(8).messages(customMessage("password")),
  })
};

export { updateUserValidator };
