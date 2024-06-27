import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class DataEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
