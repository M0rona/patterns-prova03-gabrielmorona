class EmailValidator {
  validate(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

class EmailFormatter {
  format(email) {
    return email.trim().toLowerCase();
  }
}

class EmailSender {
  constructor() {
    this.sentEmails = [];
  }

  send(email, message) {
    this.sentEmails.push({ email, message, timestamp: new Date() });
    console.log(`Email enviado para ${email}: ${message}`);
  }

  getSentEmails() {
    return this.sentEmails;
  }
}

class SmtpEmailSender extends EmailSender {
  send(email, message) {
    super.send(email, message);
    console.log(`[SMTP] Conectando ao servidor SMTP...`);
    console.log(`[SMTP] Email enviado via protocolo SMTP`);
  }
}

class ApiEmailSender extends EmailSender {
  send(email, message) {
    super.send(email, message);
    console.log(`[API] Enviando requisição HTTP para API de emails...`);
    console.log(`[API] Email enviado via API REST`);
  }
}

class EmailService {
  constructor(validator, formatter, sender) {
    this.validator = validator || new EmailValidator();
    this.formatter = formatter || new EmailFormatter();
    this.sender = sender || new EmailSender();
  }

  processAndSend(email, message) {
    const formattedEmail = this.formatter.format(email);

    if (!this.validator.validate(formattedEmail)) {
      throw new Error("Email inválido");
    }

    this.sender.send(formattedEmail, message);
  }
}

const emailService = new EmailService(
  new EmailValidator(),
  new EmailFormatter(),
  new SmtpEmailSender()
);

try {
  emailService.processAndSend("  USUARIO@EXEMPLO.COM  ", "Olá, bem-vindo!");
  console.log("Emails enviados:", emailService.sender.getSentEmails());
} catch (error) {
  console.error("Erro:", error.message);
}

const apiEmailService = new EmailService(
  new EmailValidator(),
  new EmailFormatter(),
  new ApiEmailSender()
);

try {
  apiEmailService.processAndSend("  ADMIN@EXEMPLO.COM  ", "Mensagem via API");
} catch (error) {
  console.error("Erro:", error.message);
}
