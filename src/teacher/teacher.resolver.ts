import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeacherService } from './teacher.service';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { TeacherPaginationResultOutput } from './dto/find-all-teacher.output';
import { FindAllTeacherInput } from './dto/find-all-teacher.input';
import { DoneResponseOutput } from 'src/shared/types/done-output';
import { number } from 'zod';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(private readonly service: TeacherService) {}

  @Mutation(() => Teacher)
  public createTeacher(@Args('createTeacherInput') createInput: CreateTeacherInput) {
    return this.service.create(createInput);
  }

  @Query(() => TeacherPaginationResultOutput, { name: 'teachers' })
  public findAll(@Args('filter') filter: FindAllTeacherInput) {
    return this.service.findAll(filter);
  }

  @Query(() => Teacher, { name: 'teacher' })
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne({ id });
  }

  @Mutation(() => Teacher)
  public updateTeacher(@Args('updateTeacherInput') updateInput: UpdateTeacherInput) {
    return this.service.update(updateInput);
  }

  @Mutation(() => DoneResponseOutput)
  public removeTeacher(@Args('id', { type: number }) id: number) {
    this.service.remove(id);
    return { done: true };
  }
}
