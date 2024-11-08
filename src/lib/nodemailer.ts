import { CONFIRM_EMAIL } from "@/assets/mail";
import { createTransport, type SendMailOptions } from "nodemailer";

class Mailer {
  private readonly transport = createTransport({
    host: "smtp.gmail.com",
    tls: {
      rejectUnauthorized: false,
    },
    debug: true,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  constructor() {
    this.transport.verify();
  }

  private async send_email({
    to,
    html,
    text,
    subject,
  }: Pick<SendMailOptions, "to" | "text" | "html" | "subject">) {
    const opts: SendMailOptions = {
      from: process.env.MAILER_EMAIL,
      to,
      html,
      text,
      subject,
    };

    return this.transport.sendMail(opts);
  }

  public send_confirm_mail = async (to: string, token: string) =>
    await this.send_email({
      to,
      subject: "Confirm Email",
      html: CONFIRM_EMAIL.replaceAll(
        "[TARGET_URL]",
        `${
          process.env.PUBLIC_APP_URL ?? "http://localhost:3000"
        }/user/verify?token=${token}`
      ),
    });
}

const mailer = new Mailer();

export default mailer;
