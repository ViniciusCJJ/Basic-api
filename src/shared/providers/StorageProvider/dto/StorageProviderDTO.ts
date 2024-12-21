interface IStorageProviderDTO {
  saveFile({ filename, content }: IFileArgs): Promise<string>;
  removeFile(filename: string): Promise<void>;
}

interface IFileArgs {
  filename?: string;
  content: Buffer | string;
  extension?: FileExtensions | string;
}

enum FileExtensions {
  PDF = 'pdf',
  PNG = 'png',
  JPG = 'jpg',
  JPEG = 'jpeg',
  GIF = 'gif',
  SVG = 'svg',
  DOC = 'doc',
  DOCX = 'docx',
  XLS = 'xls',
  XLSX = 'xlsx',
  PPT = 'ppt',
  PPTX = 'pptx',
  TXT = 'txt',
  CSV = 'csv',
  MP4 = 'mp4',
  MP3 = 'mp3',
  WAV = 'wav',
  AVI = 'avi',
  FLV = 'flv',
  MKV = 'mkv',
  MOV = 'mov',
  ZIP = 'zip',
  RAR = 'rar',
  TAR = 'tar',
}

export { IStorageProviderDTO, IFileArgs, FileExtensions };
