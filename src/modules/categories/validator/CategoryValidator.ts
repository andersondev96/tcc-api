
import { Joi, Segments } from "celebrate";

import { customMessage } from "@shared/utils/errors";

const CategoryValidator = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().messages(customMessage("category"))
  })
};

export { CategoryValidator };