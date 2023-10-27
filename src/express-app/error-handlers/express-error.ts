import { Application, ErrorRequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handler: ErrorRequestHandler = (err, req, res, next) => {
  const { name, message, status } = err;

  // eslint-disable-next-line no-console
  console.error(err);
  res.status(status ?? 500);
  return res.json({ name, message });
};

class ExpressError {
  public static mount(app: Application): Application {
    app.use(handler);

    return app;
  }
}

export default ExpressError;
