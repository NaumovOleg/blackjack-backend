import { Application } from 'express';

import Http from './http';
import Cors from './cors';

class Bootstrap {
  public static mount(app: Application): Application {
    Http.mount(app);
    Cors.mount(app);

    return app;
  }
}

export { Bootstrap };
