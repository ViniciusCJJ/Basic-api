
## Api simples com cadastro de usuários e autenticação.

## Como rodar o projeto
- Execute o comando `yarn` para instalar as dependências
- Preencha o arquivo `.env` com as variáveis de ambiente, seguindo o exemplo do arquivo `.env.example`
- Crie um banco de dados postgresql e preencha a variável `DATABASE_URL` no arquivo `.env`
- Execute o comando `yarn prisma migrate dev` para rodar as migrations
- Execute o comando `yarn dev` para rodar o projeto


## Tecnologias utilizadas
- Node.js
- Typescript
- Express
- PrismaORM
- Postgres
- Jest
- Swagger
- Redis
- NodeMailer
- JWT
- Bcrypt
- ESLint
- Prettier

## Documentação
- A documentação da API foi feita com Swagger e pode ser acessada em `http://localhost:3333/api-docs` (work in progress)

## Testes
- Para rodar os testes, execute o comando `yarn test`, o jest está configurado para identificar apenas arquivos ts(x), se necessário, altere o arquivo `jest.config.js`.

