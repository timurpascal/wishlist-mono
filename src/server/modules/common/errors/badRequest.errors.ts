import { BaseErrorDto } from './baseErrorDto';

export class BadRequestErrors {
  static noUniqField(field: string) {
    return new BaseErrorDto(400, `${field} already exist, and must be unique`, 'NoUniqField');
  }

  static notFound(message: string) {
    return new BaseErrorDto(404, message, 'NotFound');
  }

  static idNotValid(id: string) {
    return new BaseErrorDto(400, `Id = ${id} is not valid`, 'IdNotValid');
  }

  static unauthorized(message: string) {
    return new BaseErrorDto(401, message, 'Unauthorized');
  }

  static forbidden(message: string) {
    return new BaseErrorDto(403, message, 'Forbidden');
  }

  static badRequest(message: string) {
    return new BaseErrorDto(400, message, 'BadRequest');
  }
}
