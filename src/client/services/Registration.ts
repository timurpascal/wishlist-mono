import { AxiosResponse } from 'axios';
import { AccessTokenDto } from 'src/server/modules/core/auth/dto/accessToken.dto';
import { UserCreateDto } from 'src/server/modules/domain/users/dto/user.create.dto';
import { registrationService } from '../api/registration';

const RegistrationService = {
  registration: async (registration: UserCreateDto) => {
    const { data }: AxiosResponse<AccessTokenDto> = await registrationService(registration);
    const { accessToken } = data;
    return accessToken;
  },
};

export default RegistrationService;
