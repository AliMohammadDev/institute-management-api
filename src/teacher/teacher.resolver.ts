import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { TeacherPaginationResultOutput } from './dto/find-all-teacher.output';
import { FindAllTeacherInput } from './dto/find-all-teacher.input';
import { DoneResponseOutput } from 'src/shared/types/done-output';
import { number } from 'zod';
import { TeacherService } from './teacher.service';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Mutation(() => Teacher)
  public createTeacher(@Args('createTeacherInput') createTeacherInput: CreateTeacherInput) {
    return this.teacherService.create(createTeacherInput);
  }

  @Query(() => TeacherPaginationResultOutput, { name: 'teachers' })
  public findAll(@Args('filter') filter: FindAllTeacherInput) {
    return this.teacherService.findAll(filter);
  }

  @Query(() => Teacher, { name: 'teacher' })
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teacherService.findOne({ id });
  }

  @Mutation(() => Teacher)
  public updateTeacher(@Args('updateTeacherInput') updateInput: UpdateTeacherInput) {
    return this.teacherService.update(updateInput);
  }

  @Mutation(() => DoneResponseOutput)
  public removeTeacher(@Args('id', { type: () => Int }) id: number) {
    this.teacherService.remove(id);
    return { done: true };
  }
}
