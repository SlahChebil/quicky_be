import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsHttpUrl(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isHttpUrl',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && /^(https?:\/\/)/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid URL starting with http:// or https://`;
        },
      },
    });
  };
}
