import { Injectable } from '@nestjs/common';
import { EsewaUseCaseImp } from './esewa.usecase';
import { PAYMENT_PROVIDER } from '../../common/enums/transaction/transaction.enum';
import { PaymentUseCase } from '../../core/ports/in/payment/payment-usecase.port';
import { KhaltiUseCaseImp } from './khalti.usecase';
import { ConnectIpsUseCaseImp } from './connectIps.usecase';

@Injectable()
export class PaymentFactory {
  constructor(
    private readonly esewaUseCaseImp: EsewaUseCaseImp,
    private readonly khaltiUseCaseImp: KhaltiUseCaseImp,
    private readonly connectIpsUseCaseImp: ConnectIpsUseCaseImp,
  ) {}

  public create(paymentProvider: PAYMENT_PROVIDER): PaymentUseCase {
    switch (paymentProvider) {
      case PAYMENT_PROVIDER.ESEWA: {
        return this.esewaUseCaseImp;
      }
      case PAYMENT_PROVIDER.KHALTI:{
        return this.khaltiUseCaseImp;
      }
      case PAYMENT_PROVIDER.CONNECT_IPS:{
        return this.connectIpsUseCaseImp;
      }
      default: return this.esewaUseCaseImp;
    }
  }
}
