require('dotenv').config()
const nodemailer = require("nodemailer");

class MailService {
  async sendMail(template, destinatario, asunto) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.MAIL,
        pass: process.env.MAILPASS,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    // Envia correo con los parámetros establecidos
    await transporter.sendMail({
      from: "Camino Flexible (Universidad de Medellín)", // Entidad emisora
      to: destinatario, // Lista de destinatarios
      subject: asunto, // Asunto
      html: template, // html body
    });
  }
}

module.exports = MailService;
