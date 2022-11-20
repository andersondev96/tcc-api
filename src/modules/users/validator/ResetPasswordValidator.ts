
import { customMessage } from "@shared/utils/errors";
import { Joi, Segments } from "celebrate";

const resetPasswordValidator = {
    [Segments.BODY]: Joi.object().keys({
        password: Joi.string().min(6).required().messages(customMessage('senha'))
    })
}

export { resetPasswordValidator };