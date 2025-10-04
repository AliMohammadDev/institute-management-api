import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'The gender (male, female)',
});
