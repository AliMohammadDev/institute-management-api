import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserPaginationResultOutput } from './dto/find-all-user.output';
import { FindAllUserInput } from './dto/find-all-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  public createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => UserPaginationResultOutput, { name: 'users' })
  public findAll(@Args('filter') filter: FindAllUserInput) {
    return this.userService.findAll(filter);
  }

  @Query(() => User, { name: 'user' })
  public findOne(@Args('id') id: number) {
    return this.userService.findOne({ id });
  }

  @Mutation(() => User)
  public updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => User)
  public removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
