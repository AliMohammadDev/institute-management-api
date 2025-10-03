import { InputType, Int, Field, Float } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateTeacherSharedInput } from 'src/teacher-shared/dto/create-teacher-shared.input';

@InputType()
export class CreateTeacherInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  phone: string;

  @IsNotEmpty()
  @Field(() => [CreateTeacherSharedInput], { nullable: true })
  sharedIds?: CreateTeacherSharedInput[];
}
