
import { Joi, Segments } from "celebrate";

import { customMessage } from "@shared/utils/errors";

const forgotPasswordValidator = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages(customMessage('email')),
  })
}

export { forgotPasswordValidator };