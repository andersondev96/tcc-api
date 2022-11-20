
import { customMessage } from "@shared/utils/errors";
import { Joi, Segments } from "celebrate";

const sessionValidator = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required().messages(customMessage('email')),
        password: Joi.string().min(6).required().messages(customMessage('senha')),
    })
}

export { sessionValidator };