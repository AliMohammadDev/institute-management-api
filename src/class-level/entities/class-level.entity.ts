import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Group } from 'src/group/entities/group.entity';
import { BaseEntity } from 'src/shared/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ClassLevel extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column('varchar', { length: 100 })
  @Field({ nullable: true })
  name: string;

  @OneToMany(() => Group, (group) => group.classLevel)
  @Field(() => [Group], { nullable: true })
  groups?: Group[];
}
