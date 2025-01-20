import express from 'express';
import cors from 'cors';
import contactsRouter from './routers/routers-contacts.js';
import { getEnvVariable } from './utils/getEnvVariable.js';
// import { logger } from './middlewares/middleware-logger.js';
import { middlewareNotFoundHandler } from './middlewares/middlewareNotFoundHandler.js';
import { errorHandler } from './middlewares/middlewareErrorHandler.js';
import authRouter from './routers/routers-auth.js';
import cookieParser from 'cookie-parser';

export const setUpServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());
  app.use(cookieParser);
  // app.use(logger);

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

  app.use(middlewareNotFoundHandler);

  app.use(errorHandler);

  const port = Number(getEnvVariable('PORT', 3000));
  app.listen(port, () => console.log(`Server running on ${port} port`));
};
