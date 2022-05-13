import express from "express";

import { CreateUserController } from "./modules/users/infra/http/controllers/CreateUserController";

const app = express();

app.use(express.json());

const createUserController = new CreateUserController();

app.get("/", (request, response) => response.json({ message: "Hello World" }));
app.post("/users", createUserController.handle);

app.listen(3333, () => console.log("Server is running!"));
