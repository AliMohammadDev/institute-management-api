import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { TimePeriod } from 'src/shared/enums/appointment';

@InputType()
export class CreateAppointmentInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  startTime: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  endTime: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  description?: string;

  @IsOptional()
  @IsEnum(TimePeriod)
  @Field(() => TimePeriod)
  period: TimePeriod;
}
