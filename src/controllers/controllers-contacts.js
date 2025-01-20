import {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/services-contact.js';
// import { refreshToken } from '../services/services-auth.js';

import createError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Contact.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactFilterParams(req.query);
  filter.userId = req.user._id;

  const data = await getContacts({ page, perPage, sortBy, sortOrder, filter });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;

  const { id: _id } = req.params;

  const data = await getContactById({ _id, userId });

  if (!data) {
    throw createError(404, `Contact with id=${_id} not found`);
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id = ${_id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  // console.log(req.user);

  const { _id: userId } = req.user;
  const data = await addContact({ ...req.body, userId });
  // req.body - тіло запиту( те що надіслав фронтенд)

  res.status(201).json({
    status: 201,
    message: 'Successfully add contact',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.params;
  const { isNew, data } = await updateContact(
    id,
    { ...req.body, userId },
    { upsert: true },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upsert contact',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.params;
  const result = await updateContact({ _id, userId }, req.body);

  if (!result) {
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully updated contact',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.params;
  const data = await deleteContact({ _id: userId });

  if (!data) {
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.status(204).send();
};
