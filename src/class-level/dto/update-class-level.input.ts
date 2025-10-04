import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateClassLevelInput } from './create-class-level.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClassLevelInput extends PartialType(CreateClassLevelInput) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  id: number;
}
