import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { TimePeriod } from 'src/shared/enums/appointment'; // عدل المسار حسب ملفك
import { TeacherShared } from 'src/teacher-shared/entities/teacher-shared.entity';

@ObjectType()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column({ type: 'time' })
  @Field()
  startTime: string;

  @Column({ type: 'time' })
  @Field()
  endTime: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: TimePeriod, default: TimePeriod.AM })
  @Field(() => TimePeriod)
  period: TimePeriod;

  @OneToMany(() => TeacherShared, (teacherShared) => teacherShared.appointment)
  @Field(() => [TeacherShared], { nullable: true })
  teacherShareds?: TeacherShared[];
}
