import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;

  const contactsQuery = ContactCollection.find();
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  const totalItems = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const data = await ContactCollection.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData({ totalItems, page, perPage });
  return {
    data,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactCollection.findOneAndUpdate({ _id }, payload, {
    upsert,
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return { isNew, data: result.value };
};

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
