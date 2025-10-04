import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ClassLevel } from 'src/class-level/entities/class-level.entity';
import { Student } from 'src/student/entities/student.entity';
import { TeacherShared } from 'src/teacher-shared/entities/teacher-shared.entity';
import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
@Index(['name', 'classLevel'], { unique: true })
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column('varchar', { length: 100 })
  @Field()
  name: string;

  @Column('bigint')
  @Field(() => Int)
  classLevelId: number;

  @ManyToOne(() => ClassLevel, (classLevel) => classLevel.groups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'classLevelId' })
  @Field(() => ClassLevel, { nullable: true })
  classLevel?: ClassLevel;

  @OneToMany(() => Student, (student) => student.group)
  @Field(() => [Student], { nullable: true })
  students?: Student[];

  @OneToMany(() => TeacherShared, (teacherShared) => teacherShared.group)
  @Field(() => [TeacherShared], { nullable: true })
  teacherShareds?: TeacherShared[];
}
