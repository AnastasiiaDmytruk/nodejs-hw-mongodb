import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { authRegisterSchema } from '../validation/validation-auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerController } from '../controllers/controllers-auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(registerController),
);

export default authRouter;
