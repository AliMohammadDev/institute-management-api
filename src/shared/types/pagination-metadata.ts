import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationMetadata {
<<<<<<< HEAD
  constructor(total: number, current_page: number, items_per_page: number, total_pages: number) {
=======
  constructor(total: number, currentPage: number, itemsPerPage: number, totalPages: number) {
>>>>>>> e606b595f1cb1ffa22a536d6c9c6d03ab35b9f91
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
