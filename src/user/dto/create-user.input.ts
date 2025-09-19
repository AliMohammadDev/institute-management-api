import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  full_name: string;
}
