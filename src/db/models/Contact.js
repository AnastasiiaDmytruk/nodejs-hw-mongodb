import { Schema, model } from 'mongoose';

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
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  { versionKey: false, timestamps: true },
);

const ContactCollection = model('contact', contactSchema); // хоча ми звертаємось до contacts в множині але тут пишемо contact тому що так історично склалось і монгуз сам знає що звертаємось до множини ( так в документаціі вказано)
export default ContactCollection;
