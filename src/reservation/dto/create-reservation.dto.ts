import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateReservationDto {
    @IsNumber()
    @IsNotEmpty({ message: '공연 id' })
    performanceId: number;
}
