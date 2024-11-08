import { CONFIRM_EMAIL, FORGET_EMAIL } from "@/assets/mail";
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

  public send_forgot_password_mail = async (
    to: string,
    lang: "en" | "id",
    token: string
  ) => {
    const cond = lang === "en";
    return await this.send_email({
      to,
      subject: "Forgot Password",
      html: FORGET_EMAIL.replaceAll(
        "[TARGET_URL]",
        `${
          process.env.PUBLIC_APP_URL ?? "http://localhost:3000"
        }auth/reset-password?token=${token}`
      )
        .replaceAll("[TITLE]", cond ? "Password reset" : "Reset Password")
        .replaceAll(
          "[STEPS]",
          cond
            ? "After you click the button, you'll be asked to complete the following steps:"
            : "Setelah klik tombol, Anda akan diminta untuk melengkapi langkah berikut:"
        )
        .replaceAll(
          "[STEP_1]",
          cond ? "Enter your new password." : "Masukkan password baru."
        )
        .replaceAll(
          "[STEP_2]",
          cond
            ? "Enter your new password again."
            : "Masukkan ulang password baru."
        )
        .replaceAll("[STEP_3]", cond ? "Click Submit" : "Klik Submit")
        .replaceAll(
          "[REMINDER]",
          cond
            ? "This link is valid for one use only. Expires in 30 minutes."
            : "link ini hanya dapat digunakan sekali. Kadaluwarsa dalam 30 menit."
        )
        .replaceAll(
          "[MESSAGE]",
          cond
            ? "If you didn't request to reset your password, please disregard this message or contact our customer service department."
            : "Jika Anda tidak meminta untuk mereset kata sandi Anda, harap abaikan pesan ini atau hubungi bagian layanan pelanggan kami."
        )
        .replaceAll(
          "[BTN_TEXT]",
          cond ? "RESET YOUR PASSWORD" : "Reset Password Mu"
        ),
    });
  };
}

const mailer = new Mailer();

export default mailer;
