import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { User } from '@prisma/client';
import { generateJWT_Token } from '../../../shared/utils/jwt/generateJWT_Token';
import { verifyJWT_Token } from '../../../shared/utils/jwt/verifyJWT_Token';

import { JwtPayload } from 'jsonwebtoken';
import { bycrypt_salt_rounds, jwt_expires_in, jwt_secret } from '../../../config';

const signUp = async (userData: User): Promise<User> => {
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(bycrypt_salt_rounds)
  );

  const newUser = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });

  return newUser;
};

const signIn = async (email: string, password: string): Promise<JwtPayload> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  const token = generateJWT_Token(
    user as User,
    jwt_secret as string,
    jwt_expires_in as string
  );

  const verifyUser: JwtPayload = await verifyJWT_Token(
    token,
    jwt_secret as string
  );

  if (verifyUser?.id) {
    return verifyUser;
  }

  throw new ApiError(
    httpStatus.UNAUTHORIZED,
    'Authentication failed. Invalid credentials.'
  );
};

export const AuthService = { signUp, signIn };
