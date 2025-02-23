import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  authLoginSchema,
  authRegisterSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  logoutController,
  refreshSessionController,
  registerController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

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

authRouter.post('/refresh', ctrlWrapper(refreshSessionController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetPasswordSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  'reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;
