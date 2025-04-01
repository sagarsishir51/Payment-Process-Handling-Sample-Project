import {ApiProperty} from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class MultipleFileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  files: Express.Multer.File[]
}
