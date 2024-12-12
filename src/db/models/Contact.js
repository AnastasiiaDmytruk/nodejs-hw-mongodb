import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
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
    enum: ["work", "home", "personal"],
    required: true,
    default: 'personal',
  },
});

const ContactCollection = model("contact", contactSchema);
export default ContactCollection;
