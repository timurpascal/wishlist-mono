import { ApiProperty } from '@nestjs/swagger';

// import { GridFsMulterConfigService } from './multer.provider';
export class FileUploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: any;
}
