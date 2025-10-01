import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClassLevelService } from './class-level.service';
import { ClassLevel } from './entities/class-level.entity';
import { CreateClassLevelInput } from './dto/create-class-level.input';
import { UpdateClassLevelInput } from './dto/update-class-level.input';
import { NotFoundException } from '@nestjs/common';
import { ClassLevelPaginationResultOutput } from './dto/find-all-class-level.output';
import { findAllClassLevelInput } from './dto/find-all-class-level.input';

@Resolver(() => ClassLevel)
export class ClassLevelResolver {
  constructor(private readonly classLevelService: ClassLevelService) {}

  @Mutation(() => ClassLevel)
  createClassLevel(@Args('createClassLevelInput') createClassLevelInput: CreateClassLevelInput) {
    return this.classLevelService.create(createClassLevelInput);
  }

  @Query(() => ClassLevelPaginationResultOutput, { name: 'classLevels' })
  public findAll(@Args('filter') filter: findAllClassLevelInput) {
    return this.classLevelService.findAll(filter);
  }

  @Query(() => ClassLevel, { name: 'classLevel' })
  findOne(@Args('classLevelId', { type: () => Int }) classLevelId: number) {
    const classLevel = this.classLevelService.findOne({ id: classLevelId }, { relations: { groups: true } });
    if (!classLevel) {
      throw new NotFoundException(`ClassLevel #${classLevelId} not found`);
    }

    return classLevel;
  }

  @Mutation(() => ClassLevel)
  updateClassLevel(@Args('updateClassLevelInput') updateClassLevelInput: UpdateClassLevelInput) {
    const classLevel = this.classLevelService.update(updateClassLevelInput);
    if (!classLevel) {
      throw new NotFoundException(`ClassLevel #${updateClassLevelInput.id} not found`);
    }
    return classLevel;
  }

  @Mutation(() => ClassLevel)
  removeClassLevel(@Args('classLevelId', { type: () => Int }) classLevelId: number) {
    const classLevel = this.classLevelService.remove(classLevelId);
    if (!classLevel) {
      throw new NotFoundException(`ClassLevel #${classLevelId} not found`);
    }
    return classLevel;
  }
}
