import { Injectable } from '@nestjs/common';
import { EsewaUseCaseImp } from '../../../core/application/usecases/payment/esewa.usecase';
import { PAYMENT_PROVIDER } from '../../../common/enums/transaction/transaction.enum';
import { PaymentUseCase } from '../../../core/ports/in/payment/payment-usecase.port';
import { KhaltiUseCaseImp } from '../../../core/application/usecases/payment/khalti.usecase';

@Injectable()
export class PaymentFactory {
  constructor(
    private readonly esewaUseCaseImp: EsewaUseCaseImp,
    private readonly khaltiUseCaseImp: KhaltiUseCaseImp,
  ) {}

  public create(paymentProvider: PAYMENT_PROVIDER): PaymentUseCase {
    switch (paymentProvider) {
      case PAYMENT_PROVIDER.ESEWA: {
        return this.esewaUseCaseImp;
      }
      case PAYMENT_PROVIDER.KHALTI:{
        return this.khaltiUseCaseImp;
      }
      default: return this.esewaUseCaseImp;
    }
  }
}
