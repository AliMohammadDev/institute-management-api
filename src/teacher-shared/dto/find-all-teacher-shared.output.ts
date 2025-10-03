import { Field, ObjectType } from '@nestjs/graphql';

import { TeacherShared } from '../entities/teacher-shared.entity';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';

@ObjectType()
export class TeacherSharedPaginationResultOutput {
  @Field(() => [TeacherShared])
  items: TeacherShared[];

  @Field(() => PaginationMetadata)
  meta: PaginationMetadata;
}
