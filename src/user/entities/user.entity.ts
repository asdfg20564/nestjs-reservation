import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @IsNumber()
  @Column({ type: 'int', default: 0 })
  is_admin: number;

  @IsNumber()
  @Column({ type: 'int', default: 1000000 })
  point: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}