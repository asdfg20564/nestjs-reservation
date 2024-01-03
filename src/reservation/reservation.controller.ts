import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(
    @UserInfo() user: User,
    @Body() createReservationDto: CreateReservationDto)
    {
      return this.reservationService.create(user, createReservationDto);
    }

  @Get()
  async findAll(@UserInfo() user:User) {
    return this.reservationService.findAll(user);
  }

  @Get(':id')
  async findOne(@UserInfo() user:User, @Param('id') id: string) {
    return this.reservationService.findOne(user, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  async remove(@UserInfo() user:User, @Param('id') id: string) {
    return this.reservationService.remove(user, +id);
  }
}
