import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Group } from 'src/group/entities/group.entity';
import { Gender } from 'src/shared/enums/gender';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'enum', enum: Gender })
  @Field(() => Gender)
  gender?: Gender;

  @Column('varchar', { length: 255, unique: true })
  @Field()
  email: string;

  @Column('varchar', { length: 20, nullable: true })
  @Field({ nullable: true })
  phone?: string;

  @Column('varchar', { length: 255, nullable: true })
  @Field({ nullable: true })
  address?: string;

  @Column('bigint', { nullable: true })
  groupId?: number;

  @ManyToOne(() => Group, (group) => group.students, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'groupId' })
  @Field(() => Group, { nullable: true })
  group?: Group;
}
