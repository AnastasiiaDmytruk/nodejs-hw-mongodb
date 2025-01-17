import { register } from '../services/services-auth.js';

export const registerController = async (req, res) => {
  await register(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered user',
  });
};
