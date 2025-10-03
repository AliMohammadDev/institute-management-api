import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { TeacherShared } from 'src/teacher-shared/entities/teacher-shared.entity';

@ObjectType()
@Entity()
export class StudyMaterial {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  name: string;

  @OneToMany(() => TeacherShared, (teacherShared) => teacherShared.studyMaterial)
  @Field(() => [TeacherShared], { nullable: true })
  teacherShareds?: TeacherShared[];
}
