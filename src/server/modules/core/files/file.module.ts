import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { GridFSPromise } from 'gridfs-promise';
import { ConfigurationModule } from '../config/config.module';
import { ConfigurationService } from '../config/config.service';
import { GRIDGS_PROMISE } from './file.constatns';
import { FileController } from './file.controller';
import { GridFsMulterConfigService } from './multer.provider';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useClass: GridFsMulterConfigService,
    }),
    ConfigurationModule,
  ],
  providers: [
    {
      provide: GRIDGS_PROMISE,
      useFactory: (config: ConfigurationService) => {
        return new GridFSPromise(config.mongoDbName, config.getMongooseUrl());
      },
      inject: [ConfigurationService],
    },
  ],
  controllers: [FileController],
})
export class FileModule {}
