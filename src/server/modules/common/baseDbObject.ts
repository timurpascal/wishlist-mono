import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';

export class BaseDBObject {
  @ApiProperty({
    name: 'id',
    description: 'Uniq id',
    example: '5f7c1ddbb7ff8d7f11d46061',
    type: 'string',
  })
  @IsOptional()
  @IsMongoId()
  id?: any;

  @Exclude()
  @IsOptional()
  __v?: any;

  @Exclude()
  @IsOptional()
  createdAt?: any;

  @Exclude()
  @IsOptional()
  updatedAt?: any;
}
