import { Joi, Segments } from "celebrate";

import { customMessage } from "@shared/utils/errors";

const ProposalValidator = {
  [Segments.BODY]: Joi.object().keys({
    objective: Joi.string().required().messages(customMessage("objective")),
    time: Joi.date().messages(customMessage("time")),
    description: Joi.string().messages(customMessage("description")),
    telephone: Joi.number().messages(customMessage("telephone"))
  })
};

export { ProposalValidator };