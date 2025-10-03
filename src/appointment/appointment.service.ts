import { Injectable } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { generateQueryConditions, generateQuerySorts, metaTransformer } from 'src/shared/helpers';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { FindAllAppointmentInput } from './dto/find-all-appointment.input';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}
  public create(createAppointmentInput: CreateAppointmentInput) {
    const material = this.appointmentRepository.create(createAppointmentInput);
    return this.appointmentRepository.save(material);
  }

  public findAll(filter: FindAllAppointmentInput) {
    const query = this.appointmentRepository.createQueryBuilder('appointment').where('true');
    generateQuerySorts<Appointment>(query, filter, Appointment, 'appointment');
    generateQueryConditions<Appointment>(query, filter, 'appointment');

    return paginate<Appointment, PaginationMetadata>(query, {
      limit: filter.pagination.limit,
      page: filter.pagination.page,
      metaTransformer,
    });
  }

  public findOne(
    appointmentOptions: FindOptionsWhere<Appointment>,
    options?: {
      selected?: FindOptionsSelect<Appointment>;
      relations?: FindOptionsRelations<Appointment>;
    },
  ) {
    return this.appointmentRepository.findOne({
      select: options?.selected,
      relations: options?.relations,
      where: appointmentOptions,
    });
  }

  public async update(updateAppointmentInput: UpdateAppointmentInput) {
    await this.appointmentRepository.update({ id: updateAppointmentInput.id }, updateAppointmentInput);
    return this.findOne({ id: updateAppointmentInput.id });
  }

  public remove(id: number) {
    this.appointmentRepository.delete(id);
  }
}
