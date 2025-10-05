import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  teacherId: number;
}
