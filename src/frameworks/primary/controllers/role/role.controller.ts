import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query,} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {ApiCustomResponse, ApiPaginatedResponse, ResponseDto,} from '../../dto/response/response.dto';
import {RoleResponseDto} from '../../dto/response/role/role.dto';
import {CreateRoleDto, QueryRoleDto, UpdateRoleDto,} from '../../dto/request/role/role.dto';
import {Role} from 'src/core/domain/role/role.domain';
import {Privilege} from 'src/core/domain/privilege/privilege.domain';
import {RoleUseCase} from 'src/core/ports/in/role/role-usecase.port';
import {Privileges} from '../../decorators/privilege.decorator';
import {PRIVILEGE_SUBNAME} from 'src/common/enums/privilege/privilege.enum';
import {Transactional} from "typeorm-transactional";

@ApiBearerAuth()
@ApiTags('/role')
@Controller('/role')
@Privileges(PRIVILEGE_SUBNAME.ROLE)
export class RoleController {
  constructor(private readonly roleUseCase: RoleUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiPaginatedResponse(RoleResponseDto)
  async findAll(@Query() queryRoleDto: QueryRoleDto) {
    const { page, size } = queryRoleDto;

    const [roles, count] = await this.roleUseCase.getAllRoles({}, queryRoleDto);

    const data = roles.map((role) => new RoleResponseDto(role));

    return new ResponseDto('Roles Fetched', data, {
      count,
      page,
      size,
    });
  }

  @Get(':roleId')
  @ApiOperation({ summary: 'Get role by id' })
  @ApiCustomResponse(RoleResponseDto)
  async findOne(@Param('roleId', ParseIntPipe) roleId: number) {
    return new ResponseDto(
      'Role Fetched',
      new RoleResponseDto(await this.roleUseCase.getRoleById(roleId)),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create role' })
  @Transactional()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const privileges = createRoleDto.privilegeIds.map((privilegeId) =>
      Object.assign(new Privilege(), { privilegeId }),
    );

    await this.roleUseCase.createRole(
      Role.create({ ...createRoleDto, privileges }),
    );

    return new ResponseDto('Role Created');
  }

  @Patch(':roleId')
  @ApiOperation({ summary: 'Update role' })
  @Transactional()
  async update(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const privileges = updateRoleDto?.privilegeIds?.length
      ? updateRoleDto.privilegeIds.map((privilegeId) =>
          Object.assign(new Privilege(), { privilegeId }),
        )
      : undefined;

    await this.roleUseCase.updateRoleById(roleId, {
      ...updateRoleDto,
      privileges,
    });

    return new ResponseDto('Role Updated');
  }
}
