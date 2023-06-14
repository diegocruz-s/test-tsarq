import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface IdUserVerify {
  id: string;
}

export const checkAuth: (req: Request, res: Response, next: NextFunction) => void = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(422).json({
        errors: ['Access denied!!'],
      });
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      return res.status(422).json({
        errors: ['Invalid token'],
      });
    }

    const checkToken = jwt.verify(token, process.env.SECRET_TOKEN!) as IdUserVerify;

    if (checkToken) {
      req.userId = checkToken.id;
    }

    next();
  } catch (error: any) {
    return res.status(500).json({
      errors: [error.message],
    });
  }
};
