import nodemailer from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../models/IMailProvider";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5d23024ff67ba1",
    pass: "3fc31a62ffacdb",
  },
});

@injectable()
export class MailTrapProvider implements IMailProvider {
  async sendMail(to: string, subject: string, body: string): Promise<void> {
    const mail = await transport.sendMail({
      to,
      from: "Test <noreplay@test.com.br",
      subject,
      html: body,
    });

    console.log(mail);
  }
}
