import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { MatchInput, PaginationInput } from 'src/shared/types/graphql-input-types';

@InputType()
export class findAllClassLevelInput {
  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  name?: MatchInput;

  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  code?: MatchInput;

  @IsNotEmpty()
  @IsObject()
  @Type(() => PaginationInput)
  @Field(() => PaginationInput)
  pagination: PaginationInput;
}
