interface IMailConfig {
  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_USER: string;
  MAIL_PASS: string;
  MAIL_ADDRESS: string;
  MAIL_NAME: string;
}

export const MailConfig: IMailConfig = {
  MAIL_HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
  MAIL_PORT: Number(process.env.MAIL_PORT) || 587,
  MAIL_USER: process.env.MAIL_USER || '',
  MAIL_PASS: process.env.MAIL_PASS || '',
  MAIL_ADDRESS: process.env.MAIL_ADDRESS || '',
  MAIL_NAME: process.env.MAIL_NAME || '',
};
