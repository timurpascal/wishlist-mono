import { axiosInstance } from '../../api/axiosInstance';
import { FileResponse } from './FileService.types';

const FILE_ROUTE = 'files';

const FileService = {
  uploadFile: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axiosInstance.post<FileResponse>(FILE_ROUTE, formData);
    return res.data.id;
  },
};

export default FileService;
