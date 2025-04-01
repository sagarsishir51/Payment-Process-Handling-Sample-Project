import {registerAs} from '@nestjs/config';

export type AuthConfig = {
  secret: string;
  expires: string;
};

export const authConfig = registerAs<Partial<AuthConfig>>('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
}));
