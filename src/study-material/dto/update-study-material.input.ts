import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { CreateStudyMaterialInput } from './create-study-material.input';

@InputType()
export class UpdateStudyMaterialInput extends PartialType(CreateStudyMaterialInput) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  id: number;
}
