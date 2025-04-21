import {registerAs} from '@nestjs/config';

export type AppConfig = {
  port: string;
  nodeEnv: string;
  frontendUrl: string;
  backendUrl: string;
  paymentSuccessUrl:string;
  paymentFailureUrl:string;

};

export const appConfig = registerAs<Partial<AppConfig>>('app', () => ({
  port: process.env.APP_PORT,
  nodeEnv: process.env.NODE_ENV,
  frontendUrl: process.env.FRONTEND_URL,
  backendUrl: process.env.BACKEND_URL,
  paymentSuccessUrl:process.env.PAYMENT_SUCCESS_URL,
  paymentFailureUrl:process.env.PAYMENT_FAILURE_URL,
}));
