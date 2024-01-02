import _ from 'lodash';
import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { Performance } from './entities/performance.entity';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
  ){}

  async create(performances: Partial<Performance>[]) {
    const createdPerformance = await this.performanceRepository.save(performances);

    // 저장된 엔터티의 id 반환
    return createdPerformance.map((performance) => performance.id);
  }

  async findAll(): Promise<Performance[]> {
    return await this.performanceRepository.find({
      select: ['id', 'title', 'category', 'price', 'remain_seat'],
    });
  }

  async findOne(id: number) {
    if (_.isNaN(id)) {
      throw new BadRequestException('게시물 ID가 잘못되었습니다.');
    }

    return await this.performanceRepository.findOne({
      where: { id, deletedAt: null },
      select: ['title', 'content', 'performance_date', 'performance_place', 'category', 'price', 'remain_seat', 'createdAt', 'updatedAt'],
    });
  }

  async update(id: number, updatePerformanceDto: UpdatePerformanceDto) {
    return `This action updates a #${id} performance`;
  }

  async remove(id: number) {
    return `This action removes a #${id} performance`;
  }
}
