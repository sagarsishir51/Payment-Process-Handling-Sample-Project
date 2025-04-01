import {Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query,} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {ApiCustomResponse, ApiPaginatedResponse, ResponseDto,} from '../../dto/response/response.dto';
import {UserResponseDto} from '../../dto/response/user/user.dto';
import {CreateUserDto, QueryUserDto, UpdateUserDto,} from '../../dto/request/user/user.dto';
import {UserUseCase} from 'src/core/ports/in/user/user-usecase.port';
import {User} from 'src/core/domain/user/user.domain';
import {Role} from 'src/core/domain/role/role.domain';
import {Privileges} from '../../decorators/privilege.decorator';
import {PRIVILEGE_SUBNAME} from 'src/common/enums/privilege/privilege.enum';
import {Transactional} from "typeorm-transactional";

@ApiBearerAuth()
@ApiTags('/user')
@Controller('/user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiPaginatedResponse(UserResponseDto)
  async findAll(@Query() queryUserDto: QueryUserDto) {
    const { page, size, roleId, roleName, userStatus } = queryUserDto;

    const role = Object.assign(new Role(), { roleId, roleName });

    const [users, count] = await this.userUseCase.getAllUsers(
      { role, userStatus },
      queryUserDto,
    );

    const data = users.map((user) => new UserResponseDto(user));

    return new ResponseDto('Users Fetched', data, {
      count,
      page,
      size,
    });
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiCustomResponse(UserResponseDto)
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    return new ResponseDto(
      'User Fetched',
      new UserResponseDto(await this.userUseCase.getUserById(userId)),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @Privileges(PRIVILEGE_SUBNAME.USER)
  @Transactional()
  async create(@Body() createUserDto: CreateUserDto) {
    const role = Object.assign(new Role(), { roleId: createUserDto.roleId });

    await this.userUseCase.createUser(User.create({ ...createUserDto, role }));

    return new ResponseDto('User Created');
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update user' })
  @Privileges(PRIVILEGE_SUBNAME.USER)
  @Transactional()
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const role = updateUserDto.roleId
      ? Object.assign(new Role(), { roleId: updateUserDto.roleId })
      : undefined;

    delete updateUserDto.roleId;

    await this.userUseCase.updateUserById(userId, { ...updateUserDto, role });

    return new ResponseDto('User Updated');
  }
}
