import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateGroupInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => Int)
  @IsInt()
  classLevelId: number;
}
