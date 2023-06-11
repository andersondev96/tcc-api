import { container } from "tsyringe";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { GoogleMailProvider } from "./implementations/GoogleMailProvider";
import { IMailProvider } from "./models/IMailProvider";

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  google: container.resolve(GoogleMailProvider)
}

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
);