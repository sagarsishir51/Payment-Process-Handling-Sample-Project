import {join} from 'path';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ServeStaticModule} from '@nestjs/serve-static';
import {DataSource, DataSourceOptions} from 'typeorm';
import {addTransactionalDataSource} from 'typeorm-transactional';
import {TypeOrmConfigService} from './infrastructure/database/typeorm.service';
import {UserModule} from './modules/user/user.module';
import {AuthModule} from './modules/auth/auth.module';
import {JwtAuthGuard} from './frameworks/primary/guards/jwt-auth.guard';
import {PrivilegeGuard} from './frameworks/primary/guards/privilege.guard';
import {appConfig} from './infrastructure/config/app.config';
import {databaseConfig} from './infrastructure/config/database.config';
import {authConfig} from './infrastructure/config/auth.config';
import {LoggingInterceptor} from './frameworks/primary/interceptors/logging.interceptor';
import {UploadModule} from "./modules/upload/upload.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: ['.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''), // <-- path to the static files
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return addTransactionalDataSource(
          await new DataSource(options).initialize(),
        );
      },
    }),
    AuthModule,
    UserModule,
    UploadModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PrivilegeGuard },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
