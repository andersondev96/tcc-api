
import { Joi, Segments } from "celebrate";

import { customMessage } from "@shared/utils/errors";

const AssessmentValidator = {
  [Segments.BODY]: Joi.object().keys({
    comment: Joi.string().required().messages(customMessage("comment")),
    stars: Joi.number().integer().min(0).max(5).messages(customMessage("stars"))
  })
};

export { AssessmentValidator };