export type FileResponse = {
  originalname: string;
  encoding: string;
  mimetype: string;
  id: string;
  filename: string;
  metadata: string | null;
  bucketName: string;
  chunkSize: number;
  size: number;
  md5: string;
  uploadDate: string;
  contentType: string;
};
