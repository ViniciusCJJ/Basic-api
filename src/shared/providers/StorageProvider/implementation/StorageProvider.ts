import fs from 'fs';
import path from 'path';
import { IFileArgs } from '../dto/StorageProviderDTO';

class StorageProvider {
  private uploadsFolder: string;

  constructor() {
    this.uploadsFolder = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      'uploads',
    );
  }

  async saveFile({ filename, content, extension }: IFileArgs): Promise<string> {
    if (!filename) {
      filename = Date.now().toString();
    }
    if (extension) {
      filename = `${filename}.${extension}`;
    }
    const filePath = path.join(this.uploadsFolder, filename);
    if (fs.existsSync(filePath)) {
      throw new Error('Arquivo já existe');
    }
    try {
      await fs.promises.writeFile(filePath, content);
      return filePath;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao salvar o arquivo');
    }
  }

  async removeFile(filename: string): Promise<void> {
    const filePath = path.join(this.uploadsFolder, filename);

    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      } else {
        console.warn(`Arquivo não encontrado: ${filePath}`);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao remover o arquivo');
    }
  }
}

export { StorageProvider };
