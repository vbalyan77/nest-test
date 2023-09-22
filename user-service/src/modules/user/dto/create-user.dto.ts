import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({ description: 'Username', example: 'my_username' })
  username: string;

  @IsEmail()
  @ApiProperty({ description: 'Email', example: 'my_email@gmail.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ description: 'Password', example: '123456789' })
  password: string;

  @IsEnum(['admin', 'client'])
  @ApiProperty({
    description: 'User role',
    example: 'admin',
    enum: ['admin', 'client'],
  })
  role: string;
}
