import { container } from "tsyringe";

import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import BCryptProvider from "@modules/users/providers/HashProvider/implementations/BCryptProvider";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<IHashProvider>("HashProvider", BCryptProvider);
