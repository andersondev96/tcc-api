import nodemailer from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../models/IMailProvider";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
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
