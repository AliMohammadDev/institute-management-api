import { Injectable } from '@nestjs/common';
import { CreateDdInput } from './dto/create-dd.input';
import { UpdateDdInput } from './dto/update-dd.input';

@Injectable()
export class DdService {
  create(createDdInput: CreateDdInput) {
    return 'This action adds a new dd';
  }

  findAll() {
    return `This action returns all dd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dd`;
  }

  update(id: number, updateDdInput: UpdateDdInput) {
    return `This action updates a #${id} dd`;
  }

  remove(id: number) {
    return `This action removes a #${id} dd`;
  }
}
