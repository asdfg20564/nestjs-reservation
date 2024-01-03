import { IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { Performance } from 'src/performance/entities/performance.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({
  name: 'reservations',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> User, (user)=> user.reservations)
  @JoinColumn({ name: 'userId' })
  user: User;
  
  @IsNumber()
  @Column({type: 'int', name: 'userId'})
  userId: number;


  @ManyToOne(()=> Performance, (performance)=> performance.reservations)
  @JoinColumn({ name: 'performanceId' })
  performance: Performance;

  @IsNumber()
  @Column({ type: 'int', name: 'performanceId' })
  performanceId: number;

  @IsNumber()
  @Column({ type: 'int', nullable: false })
  seat_number: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}