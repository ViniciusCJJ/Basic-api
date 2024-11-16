interface IMailProviderDTO {
  sendMail(data: ISendMailDTO): Promise<void>;
  sendMailWithAttachment(data: ISendMailWithAttachmentDTO): Promise<void>;
}

interface ISendMailDTO {
  to: string | string[];
  subject: string;
  body: string;
}

interface ISendMailWithAttachmentDTO {
  to: string | string[];
  subject: string;
  body: string;
  attachments: { filename: string; path: string }[];
}

export { IMailProviderDTO, ISendMailDTO, ISendMailWithAttachmentDTO };
