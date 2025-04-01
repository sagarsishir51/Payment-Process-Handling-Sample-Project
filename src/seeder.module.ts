import {Logger, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource, DataSourceOptions} from 'typeorm';
import {addTransactionalDataSource} from 'typeorm-transactional';
import {Seeder} from './seeder';
import {TypeOrmConfigService} from './infrastructure/database/typeorm.service';
import {appConfig} from './infrastructure/config/app.config';
import {databaseConfig} from './infrastructure/config/database.config';
import {authConfig} from './infrastructure/config/auth.config';
import {UserModule} from './modules/user/user.module';
import {UserSeeder} from './seeders/user.seeder';
import {RoleSeeder} from './seeders/role.seeder';
import {PrivilegeSeeder} from './seeders/privilege.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return addTransactionalDataSource(
          await new DataSource(options).initialize(),
        );
      },
    }),
    UserModule,
  ],
  providers: [
    Logger,
    Seeder,
    UserSeeder,
    RoleSeeder,
    PrivilegeSeeder,
  ],
})
export class SeederModule {}
