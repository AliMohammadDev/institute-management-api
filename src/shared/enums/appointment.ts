import { registerEnumType } from '@nestjs/graphql';

export enum TimePeriod {
  AM = 'AM',
  PM = 'PM',
}
registerEnumType(TimePeriod, {
  name: 'TimePeriod',
  description: 'حدد الفترة الزمنية: صباحية (AM) أو مسائية (PM)',
});
