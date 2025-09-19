import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { FindAllUserInput } from './dto/find-all-user.input';
import { generateQueryConditions, generateQuerySorts, metaTransformer } from 'src/shared/helpers';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public create(createUserInput: CreateUserInput) {
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  public findAll(filter: FindAllUserInput) {
    const query = this.userRepository.createQueryBuilder('user').where('true');

    generateQuerySorts<User>(query, filter, User, 'user');

    generateQueryConditions<User>(query, filter, 'user');

    return paginate<User, PaginationMetadata>(query, {
      limit: filter.pagination.limit,
      page: filter.pagination.page,
      metaTransformer,
    });
  }

  public findOne(
    userOptions: FindOptionsWhere<User>,
    options?: {
      selected?: FindOptionsSelect<User>;
      relations?: FindOptionsRelations<User>;
    },
  ) {
    return this.userRepository.findOne({
      select: options?.selected,
      relations: options?.relations,
      where: userOptions,
    });
  }

  public async update(updateUserInput: UpdateUserInput) {
    await this.userRepository.update({ id: updateUserInput.id }, updateUserInput);

    return this.findOne({ id: updateUserInput.id });
  }

  public remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
