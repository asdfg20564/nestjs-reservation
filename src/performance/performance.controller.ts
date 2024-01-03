import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';

import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';


@UseGuards(RolesGuard)
@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createPerformanceDto: CreatePerformanceDto) {
    console.log(createPerformanceDto);

    const { title, content, performance_date, performance_place, category, price, remain_seat } = createPerformanceDto;
    const performances = Array.isArray(performance_date) ?
    performance_date.map((date) => ({
      title,
      content,
      performance_date: date,
      performance_place, 
      category, 
      price, 
      remain_seat,
    }))
    : [];
    return this.performanceService.create(performances);
  }

  @Get()
  findAll() {
    return this.performanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performanceService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerformanceDto: UpdatePerformanceDto) {
    return this.performanceService.update(+id, updatePerformanceDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.performanceService.remove(+id);
  }
}
