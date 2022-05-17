import { UserRepository } from "@modules/users/infra/prisma/repositories/UserRepository";
import BCryptProvider from "@modules/users/providers/HashProvider/implementations/BCryptProvider";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IHashProvider>("HashProvider", BCryptProvider);
