// import dotenv from 'dotenv';
import 'dotenv/config';

export const getEnvVariable = (name, defaultValue) => {
  const value = process.env[name];
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Missing ${name} environment variable`);
};
