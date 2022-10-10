import { IMailProvider } from "../models/IMailProvider";

export class FakeMailProvider implements IMailProvider {
    private message: any[] = [];


    async sendMail(to: string, subject: string, body: string): Promise<void> {
        this.message.push({
            to,
            from: "Test <noreplay@test.com.br",
            subject,
            html: body,
        });
    }
}
