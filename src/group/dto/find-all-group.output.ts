import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { Group } from '../entities/group.entity';

@ObjectType()
export class GroupPaginationResultOutput {
  @Field(() => [Group])
  items: Group[];

  @Field(() => PaginationMetadata)
  meta: PaginationMetadata;
}
