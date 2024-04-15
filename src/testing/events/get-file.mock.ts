import { getFileToBuffer } from './get-file-buffer';

export const getFileMock = async (): Promise<Express.Multer.File> => {
  const file = __dirname + '/test-for-event.jpg';
  const { buffer, stream } = await getFileToBuffer(file);

  return {
    destination: './uploads',
    fieldname: 'photo',
    filename: 'test-for-event.jpg',
    originalname: 'test-for-event.jpg',
    path: '/uploads',
    size: 1000000,
    buffer,
    stream,
    encoding: '7bit',
    mimetype: 'image/jpeg',
  };
};
