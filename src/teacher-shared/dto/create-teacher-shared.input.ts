import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateTeacherSharedInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  appointmentId: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  groupId: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  studyMaterialId: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  teacherId: number;
}
