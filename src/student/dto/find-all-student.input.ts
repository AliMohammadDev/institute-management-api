import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { MatchInput, PaginationInput, SortInput } from 'src/shared/types/graphql-input-types';

@InputType()
export class FindAllStudentInput {
  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  name?: MatchInput;

  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  firstName?: MatchInput;

  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  lastName?: MatchInput;

  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  dateOfBirth?: MatchInput;

  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  gender?: MatchInput;

  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  email?: MatchInput;

  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  phone?: MatchInput;

  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  address?: MatchInput;

  @IsNotEmpty()
  @IsObject()
  @Type(() => PaginationInput)
  @Field(() => PaginationInput)
  pagination: PaginationInput;

  @IsOptional()
  @IsObject()
  @Type(() => SortInput)
  @Field(() => SortInput, { nullable: true })
  sort?: SortInput;
}
