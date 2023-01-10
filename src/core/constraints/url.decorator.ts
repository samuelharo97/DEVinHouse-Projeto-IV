/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

async function validateUrl(url: string): Promise<boolean> {
  try {
    const { headers } = await axios.head(url);

    if (!headers['content-type'].startsWith('image')) {
      return false;
    }
  } catch (error) {
    return false;
  }
  return true;
}

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsImageUrlConstraint implements ValidatorConstraintInterface {
  async validate(url: string, args: ValidationArguments) {
    return await validateUrl(url);
  }
}

export function IsImageUrl(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsImageUrlConstraint,
    });
  };
}
