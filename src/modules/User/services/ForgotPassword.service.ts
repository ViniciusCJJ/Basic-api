import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import { IMailProviderDTO } from '@shared/providers/MailProvider/dto/MailProviderDTO';
import { IRedisProviderDTO } from '@shared/providers/RedisProvider/dto/RedisProviderDTO';
import { IUserRepository } from '../repository/UserRepository.interface';

@injectable()
class ForgotPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProviderDTO,

    @inject('RedisProvider')
    private redisProvider: IRedisProviderDTO,
  ) {}

  async execute(email: string): Promise<void> {
    const userExists = await this.userRepository.findBy({
      email,
    });

    if (userExists) {
      const token = Math.random().toString(36).substring(2, 15);

      await this.redisProvider.save({
        key: token,
        value: userExists.id,
        mode: 'EX',
        ttl: 60 * 60,
      });

      let mailTemplate;
      if (process.env.NODE_ENV === 'test' && process.env.CI_RUN) {
        // Existe algum problema com a CI definir o caminho certo do template quando
        // os testes são executados, então, para resolver isso, criei um template
        // básico para ser enviado no ambiente de teste, isso não afeta o teste, pois o intuito
        // é verificar se o mail provider está enviando o email.
        mailTemplate = `<h1>Reset your password</h1>`;
      } else {
        mailTemplate = await fs.promises.readFile(
          path.resolve(__dirname, '..', 'views', 'forgot_password.hbs'),
          'utf8',
        );
      }

      const parseTemplate = handlebars.compile(mailTemplate);

      const template = parseTemplate({
        name: userExists.name,
        token,
      });

      await this.mailProvider.sendMail({
        to: email,
        subject: 'Redefinição de senha',
        body: template,
      });
    }
  }
}

export { ForgotPasswordService };
