import {AppConfig} from './app.config';
import {AuthConfig} from './auth.config';
import {DatabaseConfig} from './database.config';
import { EsewaConfig } from './esewa.config';
import { KhaltiConfig } from './khalti.config';

export type AllConfig = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
  esewa: EsewaConfig;
  khalti: KhaltiConfig;
};
