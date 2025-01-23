import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import {
  authLoginSchema,
  authRegisterSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/validation-auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  logoutController,
  registerController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/controllers-auth.js';
import { refreshTokenController } from '../controllers/controllers-auth.js';
import { resetPassword } from '../services/services-auth.js';

const authRouter = Router();
//авторизація
authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(registerController),
);
//аутентифікація
authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(loginController),
);

authRouter.post(
  'reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.post('/refresh', ctrlWrapper(refreshTokenController));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

export default authRouter;
