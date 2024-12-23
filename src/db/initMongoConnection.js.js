import mongoose from 'mongoose';

import { getEnvVariable } from '../utils/getEnvVariable.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVariable('MONGODB_USER');
    const password = getEnvVariable('MONGODB_PASSWORD');
    const url = getEnvVariable('MONGODB_URL');
    const db = getEnvVariable('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(`Error connection Mongo ${error.message}`);
    throw error;
  }
};
