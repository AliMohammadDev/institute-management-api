import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { Student } from '../entities/student.entity';

@ObjectType()
export class StudentPaginationResultOutput {
  @Field(() => [Student])
  items: Student[];

  @Field(() => PaginationMetadata)
  meta: PaginationMetadata;
}
