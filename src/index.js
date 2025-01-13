import { setUpServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  await initMongoConnection(); // підключаємось до бази
  setUpServer(); // запускаємо сервер
};
bootstrap();
