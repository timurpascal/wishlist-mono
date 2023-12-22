import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { BadRequestErrors } from './../errors/badRequest.errors';

@Injectable()
export class MongoIdParse implements PipeTransform<any> {
  transform(id: any): string {
    const validObjectId = Types.ObjectId.isValid(id);

    if (!validObjectId) {
      throw new BadRequestException(BadRequestErrors.idNotValid(`Id = ${id} is not valid`));
    }

    return id;
  }
}
