import {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/services-contact.js';
import createError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Contact.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactFilterParams(req.query);

  const data = await getContacts({ page, perPage, sortBy, sortOrder, filter });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getContactById(id);

  if (!data) {
    throw createError(404, `Contact with id=${id} not found`);
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id = ${id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  // validation option 1
  //  const { error } = contactAddScema.validate(req.body, {
  //   abortEarly: false,
  // });
  // if (error) {
  //   throw createError(400, error.message);
  // }
  // якщо передати значення неправильно або не повністю в метода validate є два поля :
  // value та error. Тому ми деструктуризуємо(дістаємо) error і проводимо перевірку : якщо є error то викини error, якщо error немає то ми навіть не заходимо в if а одразу додаємо контакт

  // перериває роботу після першої помилки аби цього не відбувалось в метод validate другим методом передається такий об'єкт: {abortEarly: false}
  //validate це синхронний тому краще використовувати validateAsync:

  //  validation option 2
  //  try {
  //   await contactAddScema.validateAsync(req.body, { abortEarly: false });
  // } catch (error) {
  //   throw createError(400, error.message);
  // }

  // validation option 3
  // через декоратор мідлвару validateBody яка знаходиться в utils а використовується в routers

  const data = await addContact(req.body);
  // req.body - тіло запиту( те що надіслав фронтенд)

  res.status(201).json({
    status: 201,
    message: 'Successfully add contact',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { isNew, data } = await updateContact(id, req.body, { upsert: true });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upsert contact',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);

  if (!result) {
    throw createError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully updated contact',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteContact({ _id: id });

  if (!data) {
    throw createError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
};
