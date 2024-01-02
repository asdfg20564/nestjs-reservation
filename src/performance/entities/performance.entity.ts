import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'performances',
})
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column('varchar', { length: 50, nullable: false })
  title: string;

  @IsString()
  @Column('varchar', { length: 500, nullable: false })
  content: string;

  @IsDate()
  @Column('timestamp')
  performance_date: Date;

  @IsString()
  @Column('varchar', { length: 50 })
  performance_place: string;

  @IsString()
  @Column('varchar', { length: 50 })
  category: string;

  @IsNumber()
  @Column('int', { nullable: false })
  price: number;

  @IsNumber()
  @Column('int', { nullable: false })
  remain_seat: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}