import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '@user/dto/user.dto';
import { UserService } from '@user/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a user' })
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser({
      id,
      ...updateUserDto,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all users' })
  getUsers() {
    return this.userService.getUsers();
  }


  @Get("test")
  @ApiOperation({ summary: 'Test' })
  test() {
    return "Hello World";
  }
}
