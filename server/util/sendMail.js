import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "82c147924055cd",
        pass: "d6bc8f1924d9b1",
    },
});

export const sendMail = async (to, subject, text) => {
    const info = await transporter.sendMail({
      from: 'example123@email.com',
      to: to, // list of receivers
      subject: subject,
      text: "",
      html: `<a href=${text}>Password Reset Link</a>`,
    });
}