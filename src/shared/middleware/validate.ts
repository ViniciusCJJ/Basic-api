
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject} from 'zod';

export interface ValidateSchemaType {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
  headers?: AnyZodObject;
  cookies?: AnyZodObject;
}

type ValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const validateField = async (
  schema: AnyZodObject | undefined,
  data: any
): Promise<any> => {
  if (!schema) return data;
  return await schema.parseAsync(data);
};

export const validate = (schemas: ValidateSchemaType): ValidationMiddleware => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Valida cada campo da requisição de forma paralela
      const [
        validatedBody,
        validatedQuery,
        validatedParams,
        validatedHeaders,
        validatedCookies
      ] = await Promise.all([
        validateField(schemas.body, req.body),
        validateField(schemas.query, req.query),
        validateField(schemas.params, req.params),
        validateField(schemas.headers, req.headers),
        validateField(schemas.cookies, req.cookies),
      ]);

      // Atualiza a requisição com os dados validados
      if (schemas.body) req.body = validatedBody;
      if (schemas.query) req.query = validatedQuery;
      if (schemas.params) req.params = validatedParams;
      if (schemas.headers) req.headers = validatedHeaders;
      if (schemas.cookies) req.cookies = validatedCookies;

      next();
    } catch (error: any) {
      res.status(400).json({ error: error.errors });
    }
  };
};
