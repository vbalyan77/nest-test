import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Username', example: 'my_username' })
  username: string;

  @ApiProperty({ description: 'Password', example: '123456789' })
  password: string;
}

export class LoginResponse {
  @ApiProperty({ description: 'jwt token' })
  access_token: string;
}
