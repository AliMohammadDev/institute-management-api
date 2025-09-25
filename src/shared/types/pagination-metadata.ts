import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationMetadata {
  constructor(total: number, currentPage: number, itemsPerPage: number, totalPages: number) {
    this.total = total;
    this.currentPage = currentPage;
    this.itemsPerPage = itemsPerPage;
    this.totalPages = totalPages;
  }

  @Field(() => Int, { nullable: true })
  total?: number;

  @Field(() => Int, { nullable: true })
  currentPage?: number;

  @Field(() => Int, { nullable: true })
  itemsPerPage?: number;

  @Field(() => Int, { nullable: true })
  totalPages?: number;
}
