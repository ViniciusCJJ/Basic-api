import multer from 'multer';
import path from 'path';

export const MulterConfig = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, path.resolve(__dirname, '..', '..', 'uploads'));
  },
  filename(_req, file, callback) {
    const filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

export const upload = multer({ storage: MulterConfig });
