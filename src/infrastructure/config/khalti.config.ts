import {registerAs} from '@nestjs/config';

export type KhaltiConfig = {
    secretKey: string;
    secretKeyEPayment: string;
    paymentMode: string;
};

export const khaltiConfig = registerAs<KhaltiConfig>('khalti', () => ({
    secretKey: process.env.KHALTI_SECRET_KEY,
    secretKeyEPayment: process.env.KHALTI_SECRET_KEY_E_PAYMENT,
    paymentMode: process.env.KHALTI_PAYMENT_MODE
}));
