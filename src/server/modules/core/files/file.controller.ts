import { Controller, Get, Inject, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { GridFSPromise } from 'gridfs-promise';
import { BaseErrorDto } from '../../common/errors/baseErrorDto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FileUploadDto } from './dto/FileUploadDto';
import { GRIDGS_PROMISE } from './file.constatns';

@ApiTags('Files')
@Controller('/files')
@ApiUnauthorizedResponse({
  description: 'The authorization session has expired or you are not logged in, please log in.',
  type: BaseErrorDto,
})
export class FileController {
  constructor(@Inject(GRIDGS_PROMISE) private readonly gfs: GridFSPromise) {}

  // @Get()
  // @ApiResponse({
  //   description: 'Get app photos, Нахуя не понятно правда, но пусть будет',
  // })
  // findAll(): Promise<any> {
  //   return this.gfsq.
  // }

  @Get(':id')
  @ApiResponse({
    description: 'Get one photo',
  })
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<any> {
    const stream = await this.gfs.getFileStream(id);
    stream.pipe(res);
  }

  // https://medium.com/@khoa.phan.9xset/nestjs-file-uploading-using-multer-gridfs-7569a1b48022
  // TODO: connect to right db
  // TODO: validate file extendtion from config
  // TODO: GET/PUT/DELETEE request
  // TODO: Better docs and answer
  // TODO: Service and dto
  // TODO: Gridfs to another module
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    type: FileUploadDto,
  })
  uploadFile(@UploadedFile() file) {
    return {
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      id: file.id.toString(),
      filename: file.filename,
      metadata: file.metadata,
      bucketName: file.bucketName,
      chunkSize: file.chunkSize,
      size: file.size,
      md5: file.md5,
      uploadDate: file.uploadDate,
      contentType: file.contentType,
    };
  }
}
