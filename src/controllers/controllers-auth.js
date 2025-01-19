import { register, login } from '../services/services-auth.js';

export const registerController = async (req, res) => {
  await register(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered user',
  });
};

export const loginController = async (req, res) => {
  const session = await login(req.body);
  console.log(session);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully login user',
    data: {
      accessToken: session.accessToken,
    },
  });
};
