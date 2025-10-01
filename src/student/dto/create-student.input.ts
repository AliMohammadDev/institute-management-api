import { InputType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDateString, IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsDateString()
  @Type(() => Date)
  dateOfBirth: Date;

  @Field({ nullable: true })
  @IsString()
  gender?: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @IsString()
  address?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  groupId?: number;
}
