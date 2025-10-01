import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import {
  ListOfIdsInput,
  MatchInput,
  RangeDateInput,
  RangeNumberInput,
  SingleDateInput,
  SingleIdInput,
  SingleNumberInput,
  PaginationInput,
  SortInput,
} from 'src/shared/types/graphql-input-types';

@InputType()
export class FindAllStudyMaterialInput {
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
  address?: MatchInput;
}
