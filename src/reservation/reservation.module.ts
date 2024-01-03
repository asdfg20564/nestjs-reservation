import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Reservation } from './entities/reservation.entity';
import { Performance } from 'src/performance/entities/performance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Reservation, Performance])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
