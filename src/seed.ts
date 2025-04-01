import {NestFactory} from '@nestjs/core';
import {SeederModule} from './seeder.module';
import {Logger} from '@nestjs/common';
import {initializeTransactionalContext, StorageDriver,} from 'typeorm-transactional';
import {Seeder} from './seeder';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  NestFactory.createApplicationContext(SeederModule)
    .then((appContext) => {
      const logger = appContext.get(Logger);
      const seeder = appContext.get(Seeder);
      seeder
        .seed()
        .then(() => {
          logger.debug('Seeding complete!');
        })
        .catch((error) => {
          logger.error('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
