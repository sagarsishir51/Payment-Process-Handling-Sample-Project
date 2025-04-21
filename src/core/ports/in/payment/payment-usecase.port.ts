import { Payment } from '../../../domain/payment/payment.domain';
import { PaymentResponseProps } from '../../../domain/payment/payment.types';

export abstract class PaymentUseCase {
  abstract initPayment(payment:Payment): Promise<any>;
  abstract verify(data:any): Promise<PaymentResponseProps>;
}
