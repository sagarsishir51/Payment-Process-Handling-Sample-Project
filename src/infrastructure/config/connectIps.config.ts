import {registerAs} from '@nestjs/config';

export type ConnectIpsConfig = {
    merchantId: string;
    appId: string;
    appName: string;
    pfxPassword: string;
    pfxPath: string;
    basicAuthPassword: string;
    paymentMode: string;
};

export const connectIpsConfig = registerAs<ConnectIpsConfig>('connectIps', () => ({
    merchantId: process.env.CONNECT_IPS_MERCHANT_ID,
    appId: process.env.CONNECT_IPS_APP_ID,
    appName:process.env.CONNECT_IPS_APP_NAME,
    pfxPassword:process.env.CONNECT_IPS_PFX_PASSWORD,
    pfxPath:process.env.CONNECT_IPS_PFX_PATH,
    basicAuthPassword:process.env.CONNECT_IPS_BASIC_AUTH_PASSWORD,
    paymentMode:process.env.CONNECT_IPS_PAYMENT_MODE
}));
