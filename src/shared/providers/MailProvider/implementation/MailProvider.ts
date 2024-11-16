import nodemailer from 'nodemailer';
import { MailConfig } from '@config/MailConfig';
import {
  ISendMailDTO,
  ISendMailWithAttachmentDTO,
} from '../dto/MailProviderDTO';

class MailProvider {
  private transporter: nodemailer.Transporter;

  constructor() {
    const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = MailConfig;

    this.transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: false,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });
  }

  public async sendMail({ to, subject, body }: ISendMailDTO): Promise<void> {
    console.log('Sending email to:', to);
    const { MAIL_NAME, MAIL_ADDRESS } = MailConfig;

    await this.transporter.sendMail({
      from: `${MAIL_NAME} ${MAIL_ADDRESS}`,
      to,
      subject,
      text: body,
      html: body,
    });
  }

  public async sendMailWithAttachment({
    to,
    subject,
    body,
    attachments,
  }: ISendMailWithAttachmentDTO): Promise<void> {
    const { MAIL_NAME, MAIL_ADDRESS } = MailConfig;

    await this.transporter.sendMail({
      from: `${MAIL_NAME} ${MAIL_ADDRESS}`,
      to,
      subject,
      text: body,
      html: body,
      attachments,
    });
  }
}

export { MailProvider };
