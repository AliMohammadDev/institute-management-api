import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { CreateTeacherInput } from './create-teacher.input';

@InputType()
export class UpdateTeacherInput extends PartialType(CreateTeacherInput) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  id: number;
}
