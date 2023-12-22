import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';
import { BaseDBObject } from './../../../common/baseDbObject';

export class SubscriberModel extends BaseDBObject {
  @IsString()
  @IsMongoId()
  @ApiProperty({
    example: '5f7c1ddbb7ff8d7f11d46061',
    description: 'Source user id',
    required: true,
  })
  sourceId: string;

  @IsString()
  @IsMongoId()
  @ApiProperty({
    example: '5f7c1ddbb7ff8d7f11d46061',
    description: 'Target for subs',
    required: true,
  })
  destinationId: string;
}
