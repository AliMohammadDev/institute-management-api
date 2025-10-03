import { Field, ObjectType } from '@nestjs/graphql';

import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { Appointment } from '../entities/appointment.entity';

@ObjectType()
export class AppointmentPaginationResultOutput {
  @Field(() => [Appointment])
  items: Appointment[];

  @Field(() => PaginationMetadata)
  meta: PaginationMetadata;
}
