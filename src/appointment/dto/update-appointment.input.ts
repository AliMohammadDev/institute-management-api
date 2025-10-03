import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAppointmentInput } from './create-appointment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAppointmentInput extends PartialType(CreateAppointmentInput) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  id: number;
}
