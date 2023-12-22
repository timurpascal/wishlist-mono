import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AccessTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTYwMjY5ODAwMiwiZXhwIjoxNjAyNjk4MDYyfQ.LKZ8IbAHX_r1EDvXhvOikmFOYhWfxEiIyRvF4WwxB4U',
    description: 'Jwt token',
  })
  @IsString()
  accessToken: string;
}
