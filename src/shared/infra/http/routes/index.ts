import { Router } from "express";

import companiesRoutes from "@modules/companies/infra/http/routes/companies.routes";
import servicesRouter from "@modules/services/infra/http/routes/services.routes";
import passwordRoutes from "@modules/users/infra/http/routes/password.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRoutes);
routes.use("/companies", companiesRoutes);
routes.use("/services", servicesRouter)

export default routes;
