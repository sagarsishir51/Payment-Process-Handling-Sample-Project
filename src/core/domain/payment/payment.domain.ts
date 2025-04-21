import {z} from 'zod';
import {plainToInstance, Type} from 'class-transformer';
import { CreatePaymentProps } from './payment.types';

export class Payment {
  transactionId: string;
  amount: number;


  static readonly #validator = z.object({
    transactionId: z.string(),
    amount: z.number(),
  });

  static create(createPaymentProps: CreatePaymentProps) {
    return plainToInstance(Payment, this.#validator.parse(createPaymentProps), {
      exposeUnsetFields: false,
    });
  }
}
