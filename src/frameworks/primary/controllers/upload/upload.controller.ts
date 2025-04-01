import {Controller, Post, UploadedFile, UseInterceptors,} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from '@nestjs/swagger';
import {FileUploadDto} from '../../dto/upload/upload.dto';
import {ResponseDto} from '../../dto/response/response.dto';
import {multerOptions} from 'src/utils/upload';

@ApiBearerAuth()
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return new ResponseDto('File uploaded successfully', file);
  }
}
