import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, isNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateGroupInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  classLevelId: number;
}
