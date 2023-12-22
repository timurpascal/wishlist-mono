import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';
import { ConfigurationService } from '../config/config.service';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  private gridFsStorage;
  constructor(config: ConfigurationService) {
    const url = config.getMongooseUrl();
    this.gridFsStorage = new GridFsStorage({
      url,
      file: (req, file) => {
        return new Promise(resolve => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename,
          };
          resolve(fileInfo);
        });
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
