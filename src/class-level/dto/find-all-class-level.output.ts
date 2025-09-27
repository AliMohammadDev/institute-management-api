import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { ClassLevel } from '../entities/class-level.entity';

@ObjectType()
export class ClassLevelPaginationResultOutput {
  @Field(() => [ClassLevel])
  items: ClassLevel[];

  @Field(() => PaginationMetadata)
  meta: PaginationMetadata;
}
