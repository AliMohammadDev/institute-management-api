import { CreateDdInput } from './create-dd.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDdInput extends PartialType(CreateDdInput) {
  @Field(() => Int)
  id: number;
}
