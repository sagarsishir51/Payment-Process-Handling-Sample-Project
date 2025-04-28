import {Global, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {AllConfig} from 'src/infrastructure/config/config.type';
import { EsewaModule } from 'nestjs-esewa';
import { PaymentFactory } from '../../infrastructure/payment/payment.factory';
import { EsewaUseCaseImp } from '../../infrastructure/payment/esewa.usecase';
import { KhaltiModule } from 'nestjs-khalti';
import { KhaltiUseCaseImp } from '../../infrastructure/payment/khalti.usecase';

@Global()
@Module({
  imports: [
    EsewaModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfig>) => ({
        productCode: configService.get("esewa.productCode",{infer: true}),
        paymentMode: configService.get("esewa.paymentMode", {infer: true}),
        secretKey: configService.get("esewa.secret", {infer: true}),
        merchantId: configService.get("esewa.merchantId", {infer: true}),
        merchantSecret: configService.get("esewa.merchantSecret", {infer: true}),
      })
    }),
    KhaltiModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfig>) => ({
        secretKey: configService.get("khalti.secretKey", {infer: true}),
        paymentMode: configService.get("khalti.paymentMode", {infer: true})
      })
    }),
  ],
  providers: [PaymentFactory,EsewaUseCaseImp,KhaltiUseCaseImp],
  exports: [PaymentFactory,EsewaUseCaseImp,KhaltiUseCaseImp],
})
export class PaymentModule {}
