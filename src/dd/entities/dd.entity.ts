import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Dd {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
