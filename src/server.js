import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVariable } from './utils/getEnvVariable.js';

import { getContacts, getContactById } from './services/movie-services.js';

export const setUpServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    const data = await getContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const data = await getContactById();

    if (!data) {
      return res.status(404).json({
        status: 404,
        massage: ` Contact with id=${id} not found`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id = ${id}!`,
      data,
    });
    // console.log(req.params);
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((error, res, req, next) => {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  });

  const port = Number(getEnvVariable('PORT', 3000));
  app.listen(3000, () => console.log(`Server running on ${port} port`));
};
