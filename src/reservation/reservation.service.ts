import _ from 'lodash';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

import { User } from 'src/user/entities/user.entity';
import { Reservation } from './entities/reservation.entity';
import { Performance } from 'src/performance/entities/performance.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async create(user:User, createReservationDto: CreateReservationDto) {
    //공연 찾아 불러오기
    const { performanceId } = createReservationDto;
    const performance = await this.performanceRepository.findOne({
      where: {id: performanceId,}
    })

    if(_.isNil(performance)) {
      throw new NotFoundException('해당 공연이 존재하지 않습니다.');
    }

    //user price 남았는지, 공연 remain seat 남았는지
    if(user.point < performance.price) {
      throw new BadRequestException('point가 부족합니다.');
    }

    if(!performance.remain_seat) {
      throw new BadRequestException('남은 좌석이 존재하지 않습니다.');
    }

    //예약
    await this.reservationsRepository.save({
      userId: user.id,
      performanceId: performance.id,
      seat_number: performance.remain_seat,
    })

    //돈을 빼고 좌석을 준다.
    const remain_point = user.point - performance.price;
    const remain_seat = performance.remain_seat - 1;

    await this.userRepository.update({id: user.id}, {point: remain_point});
    await this.performanceRepository.update({id: performance.id}, {remain_seat:remain_seat});

    return '예약 완료';
  }

  async findAll(user: User) {
    return await this.reservationsRepository.findBy({
      userId: user.id,
    });
  }

  async findOne(user:User, id: number) {
    if (_.isNaN(id)) {
      throw new BadRequestException('게시물 ID가 잘못되었습니다.');
    }

    const reservation = await this.reservationsRepository.findOne({
      where: {id, deletedAt: null},
      select: ['id','performanceId', 'userId', 'seat_number'],
    });

    if(_.isNil(reservation)){
      throw new NotFoundException('예약을 찾을 수 없습니다.');
    }

    if(reservation.userId !==user.id) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    const performance = await this.performanceRepository.findOne({
      where: {id:reservation.performanceId},
      select: ['title', 'performance_date', 'performance_place', 'category']
    });

    return {
      id:reservation.id,
      title:performance.title,
      performance_date:performance.performance_date,
      performance_place:performance.performance_place,
      category:performance.category,
      seat_number:reservation.seat_number
    }
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  async remove(user:User, id: number) {
    if (_.isNaN(id)) {
      throw new BadRequestException('게시물 ID가 잘못되었습니다.');
    }

    const reservation = await this.reservationsRepository.findOne({
      where: {id, deletedAt: null},
      select: ['id','performanceId', 'userId', 'seat_number'],
    });

    if(_.isNil(reservation)){
      throw new NotFoundException('예약을 찾을 수 없습니다.');
    }

    if(reservation.userId !==user.id) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    const performance = await this.performanceRepository.findOne({
      where: {id: reservation.performanceId, deletedAt:null}
    })

    if(_.isNil(reservation)){
      throw new NotFoundException('공연을 찾을 수 없습니다.');
    }

    //돈을 돌려주고 좌석을 다시 채운다.
    const remain_point = user.point + performance.price;
    const remain_seat = performance.remain_seat + 1;

    await this.reservationsRepository.delete({ id });
    await this.userRepository.update({id: user.id}, {point: remain_point});
    await this.performanceRepository.update({id: performance.id}, {remain_seat:remain_seat});

    return `This action removes a #${id} reservation`;
  }
}
