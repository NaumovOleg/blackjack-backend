import { Application } from 'express';

class ConnectDb {
  public static mount(app: Application): Promise<any> {
    return Promise.resolve(app);
  }
}

export { ConnectDb };
