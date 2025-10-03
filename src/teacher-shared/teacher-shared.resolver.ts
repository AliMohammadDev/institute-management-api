import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeacherSharedService } from './teacher-shared.service';
import { TeacherShared } from './entities/teacher-shared.entity';
import { CreateTeacherSharedInput } from './dto/create-teacher-shared.input';
import { UpdateTeacherSharedInput } from './dto/update-teacher-shared.input';
import { TeacherSharedPaginationResultOutput } from './dto/find-all-teacher-shared.output';
import { FindAllTeacherSharedInput } from './dto/find-all-teacher-shared.input';
import { DoneResponseOutput } from 'src/shared/types/done-output';

@Resolver(() => TeacherShared)
export class TeacherSharedResolver {
  constructor(private readonly teacherSharedService: TeacherSharedService) {}

  @Mutation(() => TeacherShared)
  public createTeacherShared(@Args('createTeacherSharedInput') createTeacherSharedInput: CreateTeacherSharedInput) {
    return this.teacherSharedService.create(createTeacherSharedInput);
  }

  @Query(() => TeacherSharedPaginationResultOutput, { name: 'teacherShareds' })
  public findAll(@Args('filter') filter: FindAllTeacherSharedInput) {
    return this.teacherSharedService.findAll(filter);
  }

  @Query(() => TeacherShared, { name: 'teacherShared' })
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teacherSharedService.findOne({ id });
  }

  @Mutation(() => TeacherShared)
  public updateTeacherShared(@Args('updateTeacherSharedInput') updateTeacherSharedInput: UpdateTeacherSharedInput) {
    return this.teacherSharedService.update(updateTeacherSharedInput);
  }

  @Mutation(() => DoneResponseOutput)
  public removeTeacherShared(@Args('id', { type: () => Int }) id: number) {
    return this.teacherSharedService.remove(id);
  }
}
