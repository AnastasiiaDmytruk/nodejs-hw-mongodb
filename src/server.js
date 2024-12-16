import express from 'express';
import cors from 'cors';
import contactsRouter from './routers/routers-contacts.js';
import { getEnvVariable } from './utils/getEnvVariable.js';

export const setUpServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/contacts', contactsRouter);

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} Not found`,
    });
  });

  app.use((error, res, req, next) => {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  });

  const port = Number(getEnvVariable('PORT', 3000));
  app.listen(port, () => console.log(`Server running on ${port} port`));
};
