import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity({
  name: 'performances',
})
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @IsString()
  @Column({ type: 'varchar', length: 500, nullable: false })
  content: string;

  @IsDate()
  @Column({ type:'timestamp'})
  performance_date: Date;

  @IsString()
  @Column({ type: 'varchar', length: 50 })
  performance_place: string;

  @IsString()
  @Column({ type: 'varchar', length: 50 })
  category: string;

  @IsNumber()
  @Column({ type: 'int', nullable: false })
  price: number;

  @IsNumber()
  @Column({ type: 'int', nullable: false })
  remain_seat: number;

  @OneToMany(()=>Reservation, (reservation)=>reservation.performance)
  reservations: Reservation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}