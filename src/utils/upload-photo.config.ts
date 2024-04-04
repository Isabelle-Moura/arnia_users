import { diskStorage } from 'multer';

export const uploadPhotoConfig = () => {
  return {
    limits: {
      fileSize: 1024 * 1024,
    },
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
        return cb(null, false);
      }
      return cb(null, true);
    },
  };
};
