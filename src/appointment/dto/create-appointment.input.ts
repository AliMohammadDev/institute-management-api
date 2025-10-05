import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { TimePeriod, WeekDay } from 'src/shared/enums/appointment';

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

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  description?: string;

  @IsNotEmpty()
  @IsEnum(TimePeriod)
  @Field(() => TimePeriod)
  period: TimePeriod;

  @IsNotEmpty()
  @IsEnum(WeekDay)
  @Field(() => WeekDay)
  day: WeekDay;
}
