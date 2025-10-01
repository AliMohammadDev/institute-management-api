import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class StudyMaterial {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field()
  id: string;

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
}
