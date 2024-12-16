// import express from 'express';
import { Router } from 'express';

import { getContacts, getContactById } from './services/contact-services.js';

// const app = express();
const contactsRouter = Router();

contactsRouter.get('/', async (req, res) => {
  const data = await getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
});

contactsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
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
});

export default contactsRouter;
