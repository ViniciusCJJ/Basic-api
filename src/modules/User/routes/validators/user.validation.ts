import { IValidateSchemaType } from '@shared/middleware/validate';
import { z } from 'zod';

export const createUserSchema: IValidateSchemaType = {
  body: z.object({
    name: z
      .string({
        required_error: 'Campo nome é obrigatório',
      })
      .min(3, {
        message: 'Nome deve ter no mínimo 3 caracteres',
      })
      .max(255, {
        message: 'Nome deve ter no máximo 255 caracteres',
      }),
    email: z
      .string({
        required_error: 'Campo email é obrigatório',
      })
      .email({
        message: 'Email inválido',
      }),
    password: z
      .string({
        required_error: 'Campo senha é obrigatório',
      })
      .min(6, {
        message: 'Senha deve ter no mínimo 6 caracteres',
      })
      .max(255, {
        message: 'Senha deve ter no máximo 255 caracteres',
      }),
  }),
};

export const loginSchema: IValidateSchemaType = {
  body: z.object({
    email: z
      .string({
        required_error: 'Campo email é obrigatório',
      })
      .email({
        message: 'Email inválido',
      }),
    password: z.string({
      required_error: 'Campo senha é obrigatório',
    }),
  }),
};

export const updateUserSchema: IValidateSchemaType = {
  body: z.object({
    name: z
      .string({
        required_error: 'Campo nome é obrigatório',
      })
      .min(3, {
        message: 'Nome deve ter no mínimo 3 caracteres',
      })
      .max(255, {
        message: 'Nome deve ter no máximo 255 caracteres',
      })
      .optional(),
  }),
  params: z.object({
    id: z.string().regex(/^c[a-z0-9]{24}$/, {
      message: 'Id inválido',
    }),
  }),
};

export const deleteUserSchema: IValidateSchemaType = {
  params: z.object({
    id: z.string().regex(/^c[a-z0-9]{24}$/, {
      message: 'Id inválido',
    }),
  }),
};

export const getUserSchema: IValidateSchemaType = {
  params: z.object({
    id: z.string().regex(/^c[a-z0-9]{24}$/, {
      message: 'Id inválido',
    }),
  }),
};

export const indexUserSchema: IValidateSchemaType = {
  query: z.object({
    page: z
      .string()
      .transform(value => parseInt(value, 10))
      .optional(),
    limit: z
      .string()
      .transform(value => parseInt(value, 10))
      .optional(),
    name: z.string().optional(),
    email: z.string().optional(),
  }),
};
