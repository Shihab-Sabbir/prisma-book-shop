import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import { JwtPayload } from 'jsonwebtoken';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthService.signUp(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: user,
  });
});

const signIn = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await AuthService.signIn(email, password);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signin successfully!',
    token:token
  });
});

export const AuthController = {
  signUp,
  signIn,
};
