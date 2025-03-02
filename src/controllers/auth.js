import {
  register,
  login,
  logout,
  resetPassword,
  refreshSession,
  requestResetPassword,
  loginOrSignupWithGoogle,
} from '../services/auth.js';
import { generateOAuthUrl } from '../utils/googleOAuth2.js';

const setUpSessionCookies = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res) => {
  const user = await register(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginController = async (req, res) => {
  const session = await login(req.body);
  console.log(session);

  setUpSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const { code } = req.body;
  const session = await loginOrSignupWithGoogle(code);

  setUpSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in a user with Google!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshSessionController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await refreshSession({ refreshToken, sessionId });

  setUpSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logout(req.cookies.sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  await requestResetPassword(req.body.email);

  res.json({
    status: 200,
    message: 'Reset password email was successfully sent!',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateOAuthUrl();

  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};
