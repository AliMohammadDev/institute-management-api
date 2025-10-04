import { InputType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDateString, IsString, IsEmail, IsOptional, IsInt, IsEnum } from 'class-validator';
import { Gender } from 'src/shared/enums/gender';

@InputType()
export class CreateStudentInput {
  @IsString()
  @Field(() => String)
  firstName: string;

  @IsString()
  @Field(() => String)
  lastName: string;

  @IsDateString()
  @Type(() => Date)
  @Field(() => Date)
  dateOfBirth: Date;

  @IsEnum(Gender)
  @Field(() => Gender)
  gender: Gender;

  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @Field(() => String)
  phone: string;

  @IsString()
  @Field(() => String)
  address?: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  groupId?: number;
}
