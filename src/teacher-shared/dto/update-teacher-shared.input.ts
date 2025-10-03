import { CreateTeacherSharedInput } from './create-teacher-shared.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTeacherSharedInput extends PartialType(CreateTeacherSharedInput) {
  @Field(() => Int)
  id: number;
}
