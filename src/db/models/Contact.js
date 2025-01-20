import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/constants-contacts.js';
import { handleSaveError, setUpdateSettings } from '../hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: String,
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },

    contactType: {
      type: String,
      enum: typeList,
      required: true,
      default: 'personal',
    },
    //owner
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },

  { versionKey: false, timestamps: true },
);

// цей код буде повторюватись тому виносимо його в окремий файл в hooks.js

// contactSchema.post('save', (error, doc, next) => {
//   error.status = 400;
//   next();
// });

contactSchema.post('save', handleSaveError);
contactSchema.pre('findOneAndUpdate', setUpdateSettings);

// урок 4 (1.03)
// таким чином ми влізли в процес за замовчуванням : 1 зберегти 2 повернути
// а ми зробили : 1 зберегти 2 виконати ф-цію 3 продовжуй : next();

// error помилка яку викидає монгуз
// doc об'єкт який ми додаємо

// якщо передати лише 2 аргументи  (doc, next) то ф-ція спрацює лише після успішного збереження
// якщо передати 3 аргументи  (error, doc, next) то ф-ція спрацює  після невдалого збереження
// після (.post) збререження ('save') викличи ось цю ф-цію:
// (next) => {console.log('After save'); next();}

export const sortByList = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

const ContactCollection = model('contact', contactSchema); // хоча ми звертаємось до contacts в множині але тут пишемо contact тому що так історично склалось і монгуз сам знає що звертаємось до множини ( так в документаціі вказано)
export default ContactCollection;
