import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity } from 'src/shared/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ClassLevel extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Int)
  id: number;

  @Column('varchar', { length: 255, nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column('varchar', { length: 255 })
  @Field()
  code: string;
}
