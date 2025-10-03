import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsEmail,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTeacherSharedInput)
  @Field(() => [CreateTeacherSharedInput])
  teacherShareds: CreateTeacherSharedInput[];
}
