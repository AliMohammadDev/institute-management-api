import { registerEnumType } from '@nestjs/graphql';

export enum TimePeriod {
  AM = 'AM',
  PM = 'PM',
}
registerEnumType(TimePeriod, {
  name: 'TimePeriod',
  description: 'حدد الفترة الزمنية: صباحية (AM) أو مسائية (PM)',
});

export enum WeekDay {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

registerEnumType(WeekDay, {
  name: 'WeekDay',
  description: 'أيام الأسبوع من الأحد إلى السبت',
});
