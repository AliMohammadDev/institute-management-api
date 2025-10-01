import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Group } from 'src/group/entities/group.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column('varchar', { length: 255 })
  @Field()
  firstName: string;

  @Column('varchar', { length: 255 })
  @Field()
  lastName: string;

  @Column({
    type: 'date',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => (value ? new Date(value) : null),
    },
  })
  @Field(() => Date)
  dateOfBirth: Date;

  @Column('varchar', { length: 50, nullable: true })
  @Field({ nullable: true })
  gender?: string;

  @Column('varchar', { length: 255, unique: true })
  @Field()
  email: string;

  @Column('varchar', { length: 20, nullable: true })
  @Field({ nullable: true })
  phone?: string;

  @Column('varchar', { length: 255, nullable: true })
  @Field({ nullable: true })
  address?: string;

  @ManyToOne(() => Group, (group) => group.students, { onDelete: 'SET NULL' })
  @Field(() => Group, { nullable: true })
  group?: Group;
}
