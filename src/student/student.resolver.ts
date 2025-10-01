import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { FindAllStudentInput } from './dto/find-all-student.input';
import { NotFoundException } from '@nestjs/common';
import { StudentPaginationResultOutput } from './dto/find-all-student.output';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => StudentPaginationResultOutput, { name: 'students' })
  findAll(@Args('filter') filter: FindAllStudentInput) {
    return this.studentService.findAll(filter);
  }

  @Query(() => Student, { name: 'student' })
  async findOne(@Args('studentId', { type: () => Int }) studentId: number) {
    const group = await this.studentService.findOne({ id: studentId }, { relations: { group: { classLevel: true } } });
    if (!group) {
      throw new NotFoundException(`ClassLevel #${studentId} not found`);
    }
    return group;
  }

  @Mutation(() => Student)
  updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
    return this.studentService.update(updateStudentInput);
  }

  @Mutation(() => Student)
  removeStudent(@Args('studentId', { type: () => Int }) studentId: number) {
    return this.studentService.remove(studentId);
  }
}
