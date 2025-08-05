import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaymentUseCase } from '../../core/ports/in/payment/payment-usecase.port';
import { EsewaRequestDto, EsewaService } from 'nestjs-esewa';
import { ConfigService } from '@nestjs/config';
import { Payment } from '../../core/domain/payment/payment.domain';
import { KhaltiRequestDto, KhaltiService } from 'nestjs-khalti';
import { TRANSACTION_STATUS } from '../../common/enums/transaction/transaction.enum';
import { PaymentResponseProps, UpdatePaymentProps } from '../../core/domain/payment/payment.types';
import { ConnectIpsRequestDto, ConnectIpsService } from 'nestjs-connectips';
import { CONNECT_IPS_STATUS } from 'nestjs-connectips/dist/connectIps.interface';

@Injectable()
export class ConnectIpsUseCaseImp  implements PaymentUseCase {
  constructor(private connectIpsService: ConnectIpsService,
              private configService:ConfigService) {}

  async initPayment(payment: Payment): Promise<any> {
    //amount needs to be in paisa for khalti
    const connectIpsRequestDto: ConnectIpsRequestDto = {
      transactionId:payment?.transactionId,
      //in paisa
      transactionAmount: payment?.amount*100,
      //pass this data from request body rather than hard coded
      transactionDate: '2020-10-11',
      transactionCurrency: 'NPR',
      referenceId: 'referenceId',
      remarks: "remarks",
      particulars: "particulars",
    };
    return this.connectIpsService.init(connectIpsRequestDto);
  }
  async verify(data: UpdatePaymentProps): Promise<PaymentResponseProps> {
    const {transactionAmount,transactionId} = data;
    if (!transactionAmount) {
      throw new BadRequestException('Transaction Amount missing for validating connectIps payment');
    }
    if (!transactionId) {
      throw new BadRequestException('Transaction Id missing for validating connectIps payment');
    }
    const connectIpsResponseDto = await this.connectIpsService.validate({transactionAmount:transactionAmount*100,transactionId});
    if(connectIpsResponseDto?.status?.localeCompare(CONNECT_IPS_STATUS.SUCCESS)!==0){
      throw new InternalServerErrorException("Error in connect ips payment validation. Please contact admin")
    }
    return {
      paymentProviderId: connectIpsResponseDto?.transactionId,
      status: TRANSACTION_STATUS.SUCCESS,
      transactionId: connectIpsResponseDto?.transactionId,
      totalAmount: Number(connectIpsResponseDto?.transactionAmount)/100 //if system keeps amount in rupees
    }
  }
}
