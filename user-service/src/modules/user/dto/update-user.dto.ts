import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({
    description: 'Username',
    example: 'my_username',
    required: false,
  })
  username?: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'my_email@gmail.com',
    required: false,
  })
  email?: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'Password',
    example: '123456789',
    required: false,
  })
  password?: string;

  @IsEnum(['admin', 'client'])
  @ApiProperty({
    description: 'User role',
    example: 'admin',
    enum: ['admin', 'client'],
    required: false,
  })
  role?: string;
}
