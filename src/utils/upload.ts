import {existsSync, mkdirSync} from 'fs';
import {diskStorage} from 'multer';
import {v4 as uuid} from 'uuid';

export const multerConfig = {
  dest: process.env.UPLOAD_LOCATION as string,
};

export const multerOptions = {
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
  storage: diskStorage({
    destination: (
      _req: Express.Request,
      file: Express.Multer.File,
      cb: (error: null | Error, destination: string) => void,
    ) => {
      const uploadPath = (function () {
        switch (true) {
          case file.mimetype.startsWith('image'):
            return multerConfig.dest + 'image/';

          case file.mimetype.startsWith('video'):
            return multerConfig.dest + 'video/';

          default:
            return multerConfig.dest + 'file/';
        }
      })();

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      cb(null, uploadPath);
    },
    filename: (
      _req: Express.Request,
      file: Express.Multer.File,
      cb: (error: null | Error, destination: string) => void,
    ) => {
      cb(null, `${uuid()}-${file.originalname}`);
    },
  }),
};
