import { Field, ObjectType } from "@nestjs/graphql";

import { PaginationMetadata } from "src/shared/types/pagination-metadata";
import {StudyMaterial} from "../entities/study-material.entity";

@ObjectType()
export class StudyMaterialPaginationResultOutput {
  @Field(() => [StudyMaterial])
  items: StudyMaterial[];

  @Field(() => PaginationMetadata)
  meta: PaginationMetadata;
}