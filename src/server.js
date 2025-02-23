import express from 'express';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';
import { getEnvVariable } from './utils/getEnvVariable.js';
// import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';

export const setUpServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());
  app.use(cookieParser());
  // app.use(logger);

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(getEnvVariable('PORT', 3000));
  app.listen(port, () => console.log(`Server running on ${port} port`));
};
