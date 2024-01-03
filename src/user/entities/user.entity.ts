import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Role } from '../types/userRole.type';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ type: 'varchar', unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;
  
  @IsString()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @IsString()
  @Column({ type: 'varchar', default:"hello!"})
  comment: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  is_admin: Role;

  @IsNumber()
  @Column({ type: 'int', default: 1000000 })
  point: number;

  @OneToMany(()=>Reservation, (reservation)=> reservation.user)
  reservations: Reservation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}