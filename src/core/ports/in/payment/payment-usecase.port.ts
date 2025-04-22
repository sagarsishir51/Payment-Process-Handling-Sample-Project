import { Payment } from '../../../domain/payment/payment.domain';
import { PaymentResponseProps, UpdatePaymentProps } from '../../../domain/payment/payment.types';

export abstract class PaymentUseCase {
  abstract initPayment(payment:Payment): Promise<any>;
  abstract verify(data:UpdatePaymentProps): Promise<PaymentResponseProps>;
}
