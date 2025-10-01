import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  OneToMany, 
  JoinColumn 
} from "typeorm";

import { 
  ObjectType, 
  Field, 
  Int, 
  Float, 
  ID 
} from "@nestjs/graphql";



@ObjectType()
@Entity()
export class Teacher {
  @PrimaryGeneratedColumn({ type: "bigint" })
  @Field()
  id: string;

  @Column({ type: "varchar", length: 255 })
  @Field()
  name: string;


  
}