import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaymentUseCase } from '../../../ports/in/payment/payment-usecase.port';
import { EsewaRequestDto, EsewaService } from 'nestjs-esewa';
import { ConfigService } from '@nestjs/config';
import { Payment } from '../../../domain/payment/payment.domain';
import { PaymentResponseProps } from '../../../domain/payment/payment.types';
import { TRANSACTION_STATUS } from '../../../../common/enums/transaction/transaction.enum';

@Injectable()
export class EsewaUseCaseImp implements PaymentUseCase {
  constructor(private esewaService: EsewaService,
              private configService:ConfigService) {}

  async initPayment(payment: Payment): Promise<any> {
    const esewaRequestDto: EsewaRequestDto = {
      amount: payment?.amount,
      productServiceCharge: 0,
      productDeliveryCharge: 0,
      taxAmount: 0,
      totalAmount: payment?.amount,
      transactionUuid: payment?.transactionId,
      successUrl:this.configService.get<string>("app.paymentSuccessUrl"),
      failureUrl: this.configService.get<string>("app.paymentFailureUrl")
    };
    return this.esewaService.init(esewaRequestDto);
  }
  async verify(data: any): Promise<PaymentResponseProps> {
    const {encodedData} = data;
    if (!encodedData) {
      throw new BadRequestException('Data missing for validating eSewa payment');
    }
    const esewaResponseDto = await this.esewaService.verify({encodedData});
    if(esewaResponseDto?.status?.localeCompare('COMPLETE')!==0){
      throw new InternalServerErrorException("Error in esewa payment validation. Please contact admin")
    }
    return {
      paymentProviderId: esewaResponseDto?.refId,
      status: TRANSACTION_STATUS.SUCCESS,
      transactionId: esewaResponseDto?.transactionUuid,
      totalAmount: esewaResponseDto?.totalAmount,
    }
  }
}
