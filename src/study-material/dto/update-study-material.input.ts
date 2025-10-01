import { InputType, Field, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumberString } from "class-validator";
import { CreateStudyMaterialInput } from "./create-study-material.input";

@InputType()
export class UpdateStudyMaterialInput extends PartialType(CreateStudyMaterialInput) {
  @IsNotEmpty()
  @IsNumberString()
  @Field()
  id: string;
}