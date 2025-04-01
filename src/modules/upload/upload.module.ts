import {Injectable, Module, OnModuleInit} from '@nestjs/common';
import {existsSync, mkdirSync} from 'fs';
import {UploadController} from 'src/frameworks/primary/controllers/upload/upload.controller';

@Injectable()
class UploadService implements OnModuleInit {
  onModuleInit() {
    if (!existsSync('upload/image'))
      mkdirSync('upload/image', {
        recursive: true,
      });

    if (!existsSync('upload/video'))
      mkdirSync('upload/video', {
        recursive: true,
      });

    if (!existsSync('upload/file'))
      mkdirSync('upload/file', {
        recursive: true,
      });
  }
}

@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
