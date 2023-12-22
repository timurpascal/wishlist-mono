import { ApiProperty } from '@nestjs/swagger';

export class KubeHealth {
  @ApiProperty({ example: 'ok', description: 'Status app is running' })
  status: string;

  @ApiProperty({ example: 'wishlist-server', description: 'Name for application' })
  name: string;

  @ApiProperty({ example: '0.0.1', description: 'Version application' })
  version: string;

  @ApiProperty({
    example: 'http://localhost:3000/swagger',
    description: 'Link on swagger (open api) docs',
  })
  docs: string;

  @ApiProperty({
    example: 'http://localhost:3000/swagger-json',
    description: 'Link on swagger.json file (for postman and etc)',
  })
  docsJson: string;

  @ApiProperty({
    example: 'production',
    description: 'Process.env.NODE_ENV - mode run app',
  })
  mode: string;
}
