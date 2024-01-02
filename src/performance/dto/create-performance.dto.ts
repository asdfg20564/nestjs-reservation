import { IsNotEmpty, IsNumber, IsString, IsDate, IsArray } from 'class-validator';

export class CreatePerformanceDto {
  @IsString()
  @IsNotEmpty({ message: '공연 제목' })
  readonly title: string;

  @IsString()
  @IsNotEmpty({ message: '공연 상세 내용' })
  readonly content: string;

  @IsArray()
  @IsDate({each: true})
  @IsNotEmpty({ message: '공연 날짜' })
  readonly performance_date: Date[];

  @IsString()
  @IsNotEmpty({ message: '공연 위치' })
  readonly performance_place: string;

  @IsString()
  @IsNotEmpty({ message: '공연 장르' })
  readonly category: string;

  @IsNumber()
  @IsNotEmpty({ message: '공연 가격' })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty({ message: '공연 좌석 수' })
  readonly remain_seat: number;
}
