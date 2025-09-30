import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ClassLevel } from 'src/class-level/entities/class-level.entity';
import { Student } from 'src/student/entities/student.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column('varchar', { length: 100 })
  @Field()
  name: string;

  @ManyToOne(() => ClassLevel, (classLevel) => classLevel.groups, { onDelete: 'CASCADE' })
  @Field(() => ClassLevel)
  classLevel: ClassLevel;

  @OneToMany(() => Student, (student) => student.group)
  @Field(() => [Student], { nullable: true })
  students?: Student[];
}
