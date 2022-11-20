
import { customMessage } from "@shared/utils/errors";
import { Joi, Segments } from "celebrate";

const refreshTokenValidator = {
    [Segments.BODY || Segments.HEADERS || Segments.PARAMS]: Joi.object().keys({
        token: Joi.string().required().messages(customMessage('token'))
    })
}

export { refreshTokenValidator };