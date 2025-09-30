import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDdInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
