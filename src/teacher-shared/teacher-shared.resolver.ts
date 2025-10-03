import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeacherSharedService } from './teacher-shared.service';
import { TeacherShared } from './entities/teacher-shared.entity';
import { CreateTeacherSharedInput } from './dto/create-teacher-shared.input';
import { UpdateTeacherSharedInput } from './dto/update-teacher-shared.input';

@Resolver(() => TeacherShared)
export class TeacherSharedResolver {
  constructor(private readonly teacherSharedService: TeacherSharedService) {}

  @Mutation(() => TeacherShared)
  createTeacherShared(@Args('createTeacherSharedInput') createTeacherSharedInput: CreateTeacherSharedInput) {
    return this.teacherSharedService.create(createTeacherSharedInput);
  }

  @Query(() => [TeacherShared], { name: 'teacherShared' })
  findAll() {
    return this.teacherSharedService.findAll();
  }

  @Query(() => TeacherShared, { name: 'teacherShared' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teacherSharedService.findOne(id);
  }

  @Mutation(() => TeacherShared)
  updateTeacherShared(@Args('updateTeacherSharedInput') updateTeacherSharedInput: UpdateTeacherSharedInput) {
    return this.teacherSharedService.update(updateTeacherSharedInput.id, updateTeacherSharedInput);
  }

  @Mutation(() => TeacherShared)
  removeTeacherShared(@Args('id', { type: () => Int }) id: number) {
    return this.teacherSharedService.remove(id);
  }
}
