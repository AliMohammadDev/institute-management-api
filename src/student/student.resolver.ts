import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { FindAllStudentInput } from './dto/find-all-student.input';
import { StudentPaginationResultOutput } from './dto/find-all-student.output';
import { DoneResponseOutput } from 'src/shared/types/done-output';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  public createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => StudentPaginationResultOutput, { name: 'students' })
  public findAll(@Args('filter') filter: FindAllStudentInput) {
    return this.studentService.findAll(filter);
  }

  @Query(() => Student, { name: 'student' })
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.findOne({ id });
  }

  @Mutation(() => Student)
  public updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
    return this.studentService.update(updateStudentInput);
  }

  @Mutation(() => DoneResponseOutput)
  public removeStudent(@Args('id', { type: () => Int }) id: number) {
    this.studentService.remove(id);
    return { done: true };
  }
}
