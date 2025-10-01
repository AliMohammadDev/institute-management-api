import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, isNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateClassLevelInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;
}
