import { AccessTokenDto } from 'src/server/modules/core/auth/dto/accessToken.dto';
import { UserCreateDto } from 'src/server/modules/domain/users/dto/user.create.dto';
import { axiosInstance } from './axiosInstance';

export const registrationService = (data: UserCreateDto) => {
  return axiosInstance.post<AccessTokenDto>(`/users`, data);
};
