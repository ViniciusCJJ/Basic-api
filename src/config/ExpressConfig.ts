declare module 'express' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}