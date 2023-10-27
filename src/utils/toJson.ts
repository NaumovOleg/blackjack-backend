import { Request, Response, NextFunction } from 'express';

type Local = Record<string, any>;

type Handler<P, ResB, ReqB, Q, L extends Local> = (
  req: Request<P, ResB, ReqB, Q, L>,
  res: Response<ResB, L>,
  next: NextFunction
) => Promise<ResB>;

export const resToJson =
  <P, ResB, ReqB, Q, L extends Local>(action: Handler<P, ResB, ReqB, Q, L>) =>
  (req: Request<P, ResB, ReqB, Q, L>, res: Response<ResB, L>, next: NextFunction) =>
    Promise.resolve(action(req, res, next))
      .then((data) => res.json(data))
      .catch((err) => {
        next(err);
      });
