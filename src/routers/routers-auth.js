import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import {
  authLoginSchema,
  authRegisterSchema,
} from '../validation/validation-auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  registerController,
} from '../controllers/controllers-auth.js';

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

export default authRouter;
