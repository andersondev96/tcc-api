
import { Joi, Segments } from "celebrate";

import { customMessage } from "@shared/utils/errors";

const resetPasswordValidator = {
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().min(6).required().messages(customMessage('senha'))
  })
}

export { resetPasswordValidator };