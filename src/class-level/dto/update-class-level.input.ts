import { CreateClassLevelInput } from './create-class-level.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClassLevelInput extends PartialType(CreateClassLevelInput) {
  @Field(() => Int)
  id: number;
}
