import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClassLevelService } from './class-level.service';
import { ClassLevel } from './entities/class-level.entity';
import { CreateClassLevelInput } from './dto/create-class-level.input';
import { UpdateClassLevelInput } from './dto/update-class-level.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => ClassLevel)
export class ClassLevelResolver {
  constructor(private readonly classLevelService: ClassLevelService) {}

  @Mutation(() => ClassLevel)
  async createClassLevel(@Args('createClassLevelInput') createClassLevelInput: CreateClassLevelInput) {
    return await this.classLevelService.create(createClassLevelInput);
  }

  @Query(() => [ClassLevel], { name: 'classLevels' })
  async findAll() {
    return await this.classLevelService.findAll();
  }

  @Query(() => ClassLevel, { name: 'classLevel' })
  async findOne(@Args('classLevelId') classLevelId: number) {
    return await this.classLevelService.findOne({ id: classLevelId });
  }

  @Mutation(() => ClassLevel)
  async updateClassLevel(@Args('updateClassLevelInput') updateClassLevelInput: UpdateClassLevelInput) {
    const classLevel = await this.classLevelService.update(updateClassLevelInput);
    if (!classLevel) {
      throw new NotFoundException(`ClassLevel #${updateClassLevelInput.id} not found`);
    }
    return classLevel;
  }

  @Mutation(() => ClassLevel)
  async removeClassLevel(@Args('classLevelId', { type: () => Int }) classLevelId: number) {
    const classLevel = await this.classLevelService.remove(classLevelId);
    if (!classLevel) {
      throw new NotFoundException(`ClassLevel #${classLevelId} not found`);
    }
    return classLevel;
  }
}
