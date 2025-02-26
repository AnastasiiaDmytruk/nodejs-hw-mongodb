import path from 'node:path';
import { OAuth2Client } from 'google-auth-library';
import { readFile } from 'node:fs/promises';

import { getEnvVariable } from '../utils/getEnvVariable.js';
import createHttpError from 'http-errors';

const OAUTH_PATH_JSON = path.resolve('google-oauth.json');

const oauthConfig = JSON.parse(await readFile(OAUTH_PATH_JSON, 'utf-8'));

const googleOAuthClient = new OAuth2Client({
  clientId: getEnvVariable('GOOGLE_AUTH_CLIENT_ID'),
  clientSecret: getEnvVariable('GOOGLE_AUTH_CLIENT_SECRET'),
  redirectUri: oauthConfig.web.redirect_uris[0],
});

export const generateOAuthUrl = () => {
  const url = googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
  return url;
};

export const validateCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }
  return fullName;
};
