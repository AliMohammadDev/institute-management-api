import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { TeacherShared } from 'src/teacher-shared/entities/teacher-shared.entity';

@ObjectType()
@Entity()
export class Teacher {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  address: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  phone: string;

  @OneToMany(() => TeacherShared, (teacherShared) => teacherShared.teacher, { cascade: true })
  @Field(() => [TeacherShared], { nullable: true })
  teacherShareds?: TeacherShared[];
}
