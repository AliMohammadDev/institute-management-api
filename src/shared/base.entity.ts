import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export abstract class BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  @Field(() => String)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field(() => String)
  updatedAt: Date;
}
