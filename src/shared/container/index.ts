import { container } from "tsyringe";

import "@modules/users/providers";

import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { UsersTokenRepository } from "@modules/users/infra/prisma/repositories/UsersTokenRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/users/repositories/IUsersTokenRepository";

import { MailTrapProvider } from "./providers/MailProvider/implementations/MailTrapProvider";
import { IMailProvider } from "./providers/MailProvider/models/IMailProvider";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UsersTokenRepository
);

container.registerInstance<IMailProvider>(
  "MailTrapProvider",
  new MailTrapProvider()
);
