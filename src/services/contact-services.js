import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find(); // метод find() повертає всі об'єкти з колекції(якщо не передати йому жодних аргументів)

export const getContactById = (id) => ContactCollection.findById(id); // findById(id);  повертає 1 об'єкт або null якщо ми  вкажемо не правильний id( але щось що може бути id тобто кількість символів співпадає)

