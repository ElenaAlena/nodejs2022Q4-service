import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  UpdateDateColumn,
  ColumnOptions,
  CreateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

const date = {
  type: 'timestamp',
  transformer: {
    from: (value: Date) => Date.parse(value.toISOString()),
    to: (value) => value,
  },
} as ColumnOptions;
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  login: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn(date)
  createdAt: number;

  @UpdateDateColumn(date)
  updatedAt: number;

  @Column()
  @Exclude()
  password: string;
}
