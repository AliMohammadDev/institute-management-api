import { Field, ObjectType } from '@nestjs/graphql';
import { ClassLevel } from 'src/class-level/entities/class-level.entity';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { Student } from '../entities/student.entity';

@ObjectType()
export class StudentPaginationResultOutput {
  @Field(() => [Student])
  items: Student[];

  @Field(() => PaginationMetadata)
  meta: PaginationMetadata;
}
