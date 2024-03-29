import { Router } from "express";

import assessmentsRoute from "@modules/assessments/infra/http/routes/assessments.routes";
import categoriesRoutes from "@modules/categories/infra/http/routes/categories.routes";
import companiesRoutes from "@modules/companies/infra/http/routes/companies.routes";
import customersRouter from "@modules/customers/infra/http/routes/customers.routes";
import entrepreneursRoutes from "@modules/entrepreneurs/infra/http/routes/entrepreneurs.routes";
import budgetsRoutes from "@modules/proposals/infra/http/routes/budgets.routes";
import proposalsRouter from "@modules/proposals/infra/http/routes/proposals.routes";
import servicesRouter from "@modules/services/infra/http/routes/services.routes";
import passwordRoutes from "@modules/users/infra/http/routes/password.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRoutes);
routes.use("/companies", companiesRoutes);
routes.use("/services", servicesRouter);
routes.use("/categories", categoriesRoutes);
routes.use("/assessments", assessmentsRoute);
routes.use("/proposals", proposalsRouter);
routes.use("/budgets", budgetsRoutes);
routes.use("/customers", customersRouter);
routes.use("/entrepreneurs", entrepreneursRoutes);


export default routes;
