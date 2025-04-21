import {registerAs} from '@nestjs/config';

export type EsewaConfig = {
    productCode: string;
    paymentMode: string;
    merchantId: string;
    merchantSecret: string;
    secret: string;
};

export const esewaConfig = registerAs<EsewaConfig>('esewa', () => ({
    productCode: process.env.ESEWA_PRODUCT_CODE,
    paymentMode: process.env.ESEWA_PAYMENT_MODE,
    merchantId: process.env.ESEWA_MERCHANT_ID,
    merchantSecret: process.env.ESEWA_MERCHANT_SECRET,
    secret: process.env.ESEWA_SECRET_KEY,
}));
