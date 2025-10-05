import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Group } from 'src/group/entities/group.entity';
import { StudyMaterial } from 'src/study-material/entities/study-material.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class TeacherShared {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column('bigint')
  @Field(() => Int)
  appointmentId: number;

  @Column('bigint', { nullable: true })
  @Field(() => Int, { nullable: true })
  teacherId: number;

  @Column('bigint')
  @Field(() => Int)
  groupId: number;

  @Column('bigint')
  @Field(() => Int)
  studyMaterialId: number;

  @ManyToOne(() => StudyMaterial, (studyMaterial) => studyMaterial.teacherShareds)
  @JoinColumn({ name: 'studyMaterialId' })
  @Field(() => StudyMaterial, { nullable: true })
  studyMaterial?: StudyMaterial;

  @ManyToOne(() => Group, (group) => group.teacherShareds)
  @JoinColumn({ name: 'groupId' })
  @Field(() => Group, { nullable: true })
  group?: Group;

  @ManyToOne(() => Teacher, (teacher) => teacher.teacherShareds)
  @JoinColumn({ name: 'teacherId' })
  @Field(() => Teacher, { nullable: true })
  teacher?: Teacher;

  @ManyToOne(() => Appointment, (appointment) => appointment.teacherShareds)
  @JoinColumn({ name: 'appointmentId' })
  @Field(() => Appointment, { nullable: true })
  appointment?: Appointment;
}
