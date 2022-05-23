import { Router } from "express";

import { passwordRoutes } from "@modules/users/infra/http/routes/password.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRoutes);

export default routes;
