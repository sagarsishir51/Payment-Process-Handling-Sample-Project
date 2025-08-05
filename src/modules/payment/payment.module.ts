import {Global, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {AllConfig} from 'src/infrastructure/config/config.type';
import { EsewaModule } from 'nestjs-esewa';
import { PaymentFactory } from '../../infrastructure/payment/payment.factory';
import { EsewaUseCaseImp } from '../../infrastructure/payment/esewa.usecase';
import { KhaltiModule } from 'nestjs-khalti';
import { KhaltiUseCaseImp } from '../../infrastructure/payment/khalti.usecase';
import { ConnectIpsModule } from 'nestjs-connectips';
import { ConnectIpsUseCaseImp } from '../../infrastructure/payment/connectIps.usecase';

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
    ConnectIpsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfig>) => ({
        paymentMode: configService.get("connectIps.paymentMode", {infer: true}),
        merchantId: configService.get("connectIps.merchantId", {infer: true}),
        appId: configService.get("connectIps.appId", {infer: true}),
        appName: configService.get("connectIps.appName", {infer: true}),
        pfxPassword: configService.get("connectIps.pfxPassword", {infer: true}),
        basicAuthPassword: configService.get("connectIps.basicAuthPassword", {infer: true}),
        pfxPath: configService.get("connectIps.pfxPath", {infer: true}),
      })
    })
  ],
  providers: [PaymentFactory,EsewaUseCaseImp,KhaltiUseCaseImp,ConnectIpsUseCaseImp],
  exports: [PaymentFactory,EsewaUseCaseImp,KhaltiUseCaseImp,ConnectIpsUseCaseImp],
})
export class PaymentModule {}
