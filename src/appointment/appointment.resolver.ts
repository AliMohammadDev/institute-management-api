import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { FindAllAppointmentInput } from './dto/find-all-appointment.input';
import { AppointmentPaginationResultOutput } from './dto/find-all-appointment.output';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Mutation(() => Appointment)
  public createAppointment(@Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput) {
    return this.appointmentService.create(createAppointmentInput);
  }

  @Query(() => AppointmentPaginationResultOutput, { name: 'appointments' })
  public findAll(@Args('filter') filter: FindAllAppointmentInput) {
    return this.appointmentService.findAll(filter);
  }

  @Query(() => Appointment, { name: 'appointment' })
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentService.findOne({ id });
  }

  @Mutation(() => Appointment)
  public updateAppointment(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
    return this.appointmentService.update(updateAppointmentInput);
  }

  @Mutation(() => Appointment)
  public removeAppointment(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentService.remove(id);
  }
}
