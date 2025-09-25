import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column('varchar', { length: 255, nullable: true })
  @Field({ nullable: true })
  fullName: string;

  @Column('varchar', { length: 255 })
  @Field()
  email: string;

  @Column('varchar', { length: 255 })
  password: string;
}
