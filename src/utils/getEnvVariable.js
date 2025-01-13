import 'dotenv/config'; // пакет який зчитує .env

export const getEnvVariable = (name, defaultValue) => {
  const value = process.env[name]; // змінні оточення- налаштування компютера на якому запускається код
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Missing ${name} environment variable`);
};
