import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';

import { Type } from 'class-transformer';
import { MatchInput, PaginationInput } from 'src/shared/types/graphql-input-types';

@InputType()
export class FindAllUserInput {
  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  full_name?: MatchInput;

  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  password?: MatchInput;

  @IsOptional()
  @IsObject()
  @Type(() => MatchInput)
  @Field(() => MatchInput, { nullable: true })
  user_name?: MatchInput;

  @IsNotEmpty()
  @IsObject()
  @Type(() => PaginationInput)
  @Field(() => PaginationInput)
  pagination: PaginationInput;
}
