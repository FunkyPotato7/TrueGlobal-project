import { ValueTransformer } from 'typeorm';

export class UserTransformer implements ValueTransformer {
  to(value: string): string {
    return value.toLowerCase();
  }

  from(value: string): string {
    return value;
  }
}
