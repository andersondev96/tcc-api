import "@modules/users/providers";
import { container } from "tsyringe";

import { AddressesRepository } from "@modules/companies/infra/prisma/repositories/AddressesRepository";
import { CompaniesRepository } from "@modules/companies/infra/prisma/repositories/CompaniesRepository";
import { ContactsRepository } from "@modules/companies/infra/prisma/repositories/ContactsRepository";
import { EntrepreneursRepository } from "@modules/companies/infra/prisma/repositories/EntrepreneursRepository";
import { ImagesCompanyRepository } from "@modules/companies/infra/prisma/repositories/ImagesCompanyRepository";
import { SchedulesRepository } from "@modules/companies/infra/prisma/repositories/SchedulesRepository";
import { IAddressesRepository } from "@modules/companies/repositories/IAddressesRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { IEntrepreneursRepository } from "@modules/companies/repositories/IEntrepreneursRepository";
import { IImagesCompanyRepository } from "@modules/companies/repositories/IImagesCompanyRepository";
import { ISchedulesRepository } from "@modules/companies/repositories/ISchedulesRepository";
import { ServicesRepository } from "@modules/services/infra/prisma/repositories/ServicesRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { UsersTokenRepository } from "@modules/users/infra/prisma/repositories/UsersTokenRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/users/repositories/IUsersTokenRepository";

import { EtherealMailProvider } from "./providers/MailProvider/implementations/EtherealMailProvider";
import { IMailProvider } from "./providers/MailProvider/models/IMailProvider";
import { LocalStorageProvider } from "./providers/StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./providers/StorageProvider/models/IStorageProvider";


container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UsersTokenRepository
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerInstance<IStorageProvider>(
  "StorageProvider",
  new LocalStorageProvider()
);

container.registerInstance<ICompaniesRepository>(
  "CompaniesRepository",
  new CompaniesRepository()
);

container.registerInstance<IContactsRepository>(
  "ContactsRepository",
  new ContactsRepository()
);

container.registerInstance<ISchedulesRepository>(
  "SchedulesRepository",
  new SchedulesRepository()
);

container.registerInstance<IAddressesRepository>(
  "AddressesRepository",
  new AddressesRepository()
);

container.registerInstance<IImagesCompanyRepository>(
  "ImagesCompanyRepository",
  new ImagesCompanyRepository()
);

container.registerInstance<IServicesRepository>(
  "ServicesRepository",
  new ServicesRepository()
);

container.registerInstance<IEntrepreneursRepository>(
  "EntrepreneursRepository",
  new EntrepreneursRepository()
);
