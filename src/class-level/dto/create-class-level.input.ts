import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateClassLevelInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsString()
  @Field()
  code: string;
}
