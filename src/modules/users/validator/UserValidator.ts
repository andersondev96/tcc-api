
import { Joi, Segments } from "celebrate";

import { customMessage } from "@shared/utils/errors";

const userValidator = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().messages(customMessage("name")),
    email: Joi.string().email().required().messages(customMessage("email")),
    password: Joi.string().alphanum().min(8).required().messages(customMessage("password")),
    isEntrepreneur: Joi.boolean().messages(customMessage("entrepreneur"))
  })
};

export { userValidator };