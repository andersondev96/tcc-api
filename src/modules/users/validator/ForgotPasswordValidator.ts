
import { customMessage } from "@shared/utils/errors";
import { Joi, Segments } from "celebrate";

const forgotPasswordValidator = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required().messages(customMessage('email')),
    })
}

export { forgotPasswordValidator };