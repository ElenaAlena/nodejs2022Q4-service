import { DataSource } from 'typeorm';
import { typeOrmConfig } from './ormconfig';

export default new DataSource(typeOrmConfig);
