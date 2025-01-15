const parseNumber = (number, defaultValue) => {
  if (typeof number !== 'string') return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) return defaultValue;
  return parsedNumber;
};

export const parsePaginationParams = ({ page, perPage }) => {
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);
  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

// на всякий випадок перевіряємо і приводимо запит пагінації до понмального стану тримаємо в голові що фронтенд розробник міг зробити помилки тому
// Для перевірки того що приходить з фронєнда треба виконати 3 дії з page і perPage:
// 1. Чи передали значення
// 2. Чи можна з нього зробити число
// 3. Повернути значення за замовчуванням або числове значення
