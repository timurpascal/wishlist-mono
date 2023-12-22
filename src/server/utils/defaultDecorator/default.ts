import { Transform } from 'class-transformer';

export const Default = (defaultValue: any) => {
  return Transform((data: any) => data.value ?? defaultValue);
};
