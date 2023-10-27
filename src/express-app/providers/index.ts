import { Application } from 'express';
import { ConnectDb } from './db-connection';

class Providers {
  public static mount(app: Application): Application {
    ConnectDb.mount(app);
    return app;
  }
}

export { Providers };
