import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field()
  id: string;
  @Column('varchar', { length: 255 })
  @Field()
  user_name: string;
  @Column('varchar', { length: 255 })
  @Field()
  password: string;

  @Column('varchar', { length: 255, nullable: true })
  @Field({ nullable: true })
  full_name: string;
}
