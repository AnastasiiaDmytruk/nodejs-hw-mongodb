// import { typeList } from '../../constants/constants-contacts.js';

const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  //   const isType = (type) => typeList.includes(type);
  const isType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isType(type)) return type;
};

export const parseContactFilterParams = ({ type }) => {
  const parsedContactType = parseContactType(type);
  return {
    type: parsedContactType,
  };
};
