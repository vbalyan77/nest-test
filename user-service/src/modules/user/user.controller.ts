import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Post,
  HttpCode,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { ApiKeyGuard } from 'src/core/guards';
import {
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'Successfully created the user.',
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    description: 'List of users.',
    type: [CreateUserDto],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'User.',
    type: CreateUserDto,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Successfully updated the user.',
    type: UpdateUserDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get('username/:username')
  @UseGuards(ApiKeyGuard)
  @HttpCode(200)
  @ApiExcludeEndpoint()
  async findUserByUsername(@Param('username') username: string) {
    return this.userService.findUserByUsername(username);
  }
}
