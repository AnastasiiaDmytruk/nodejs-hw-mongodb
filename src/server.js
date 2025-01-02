import express from 'express';
import cors from 'cors';

import { getEnvVariable } from './utils/getEnvVariable.js';
import { getContacts, getContactById } from './services/contact-services.js';

export const setUpServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    const data = await getContacts();

    res.json({
      status: 200, // це статус для краси ..додаткова інфа , справжній статус ми встановлюємо так:  res.status(200).json
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params; // витягуємо id з req.params // Express автоматично обробляє параметри шляху і додає їх у зручний об'єкт req.params.

    const data = await getContactById(id);

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
