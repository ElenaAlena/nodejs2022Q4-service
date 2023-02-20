import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { typeOrmConfig } from './ormconfig';

export default new DataSource({
  ...typeOrmConfig,
  url: process.env.DATABASE_MIGRATIONS,
} as DataSourceOptions);
