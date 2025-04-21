import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaymentUseCase } from '../../../ports/in/payment/payment-usecase.port';
import { EsewaRequestDto, EsewaService } from 'nestjs-esewa';
import { ConfigService } from '@nestjs/config';
import { Payment } from '../../../domain/payment/payment.domain';
import { KhaltiRequestDto, KhaltiService } from 'nestjs-khalti';
import { TRANSACTION_STATUS } from '../../../../common/enums/transaction/transaction.enum';

@Injectable()
export class KhaltiUseCaseImp implements PaymentUseCase {
  constructor(private khaltiService: KhaltiService,
              private configService:ConfigService) {}

  async initPayment(payment: Payment): Promise<any> {
    //amount needs to be in paisa for khalti
    const khaltiRequestDto: KhaltiRequestDto = {
      amount: payment?.amount*100,
      purchaseOrderId: payment?.transactionId,
      purchaseOrderName: '0',
      returnUrl:this.configService.get<string>("app.paymentSuccessUrl"),
      websiteUrl:this.configService.get<string>("app.frontendUrl")
    };
    return this.khaltiService.init(khaltiRequestDto);
  }
  async verify(data: any): Promise<any> {
    const {pidx} = data;
    if (!pidx) {
      throw new BadRequestException('Data missing for validating khalti payment');
    }
    const khaltiResponseDto = await this.khaltiService.lookUp({pidx});
    if(khaltiResponseDto?.status?.localeCompare('Completed')!==0){
      throw new InternalServerErrorException("Error in khalti payment validation. Please contact admin")
    }
    return {
      paymentProviderId: khaltiResponseDto?.pidx,
      status: TRANSACTION_STATUS.SUCCESS,
      transactionId: khaltiResponseDto?.transactionId,
      totalAmount: (khaltiResponseDto?.totalAmount)/100 //if system keeps amount in rupees
    }
  }
}
