import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ClassLevel } from 'src/class-level/entities/class-level.entity';
import { Student } from 'src/student/entities/student.entity';
import { BaseEntity, Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => ClassLevel, (classLevel) => classLevel.groups, { onDelete: 'CASCADE' })
  @Field(() => ClassLevel, { nullable: true })
  classLevel: ClassLevel;

  @OneToMany(() => Student, (student) => student.group)
  @Field(() => [Student], { nullable: 'itemsAndList' })
  students?: Student[];
}
