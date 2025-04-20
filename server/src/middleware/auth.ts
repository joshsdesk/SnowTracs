import jwt from 'jsonwebtoken';
import { Request } from 'express';

const secret = process.env.JWT_SECRET || 'mysecretkey';
const expiration = '2h';

export const authMiddleware = async ({ req }: { req: Request }): Promise<{ user: any }> => {
  let user = null;

  try {
    const token = req.headers.authorization?.split(' ').pop();
    if (token) {
      const { data } = jwt.verify(token, secret) as { data: any };
      user = data;
    }
  } catch (err) {
    console.warn('Invalid token', err);
  }

  return Promise.resolve({ user });
};

export const signToken = (user: any): string => {
  return jwt.sign({ data: user }, secret, { expiresIn: expiration });
};
