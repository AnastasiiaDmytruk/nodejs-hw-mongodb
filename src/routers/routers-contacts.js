import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  addContactController,
  upsertContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/controllers-contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  contactAddScema,
  contactUpdateScema,
} from '../validation/validation-contacts.js';
import { validateBody } from '../utils/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactsByIdController));

contactsRouter.post(
  '/',
  validateBody(contactAddScema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(contactUpdateScema),
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  validateBody(contactUpdateScema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController));
export default contactsRouter;
