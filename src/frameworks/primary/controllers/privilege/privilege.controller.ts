import {Controller, Get, Param, ParseIntPipe, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {ApiCustomResponse, ApiPaginatedResponse, ResponseDto,} from '../../dto/response/response.dto';
import {PrivilegeResponseDto} from '../../dto/response/privilege/privilege.dto';
import {QueryPrivilegeDto} from '../../dto/request/privilege/privilege.dto';
import {PrivilegeUseCase} from 'src/core/ports/in/privilege/privilege-usecase.port';
import {Privileges} from '../../decorators/privilege.decorator';
import {PRIVILEGE_SUBNAME} from 'src/common/enums/privilege/privilege.enum';

@ApiBearerAuth()
@ApiTags('/privilege')
@Controller('/privilege')
@Privileges(PRIVILEGE_SUBNAME.PRIVILEGE)
export class PrivilegeController {
  constructor(private readonly privilegeUseCase: PrivilegeUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get all privileges' })
  @ApiPaginatedResponse(PrivilegeResponseDto)
  async findAll(@Query() queryPrivilegeDto: QueryPrivilegeDto) {
    const { page, size } = queryPrivilegeDto;

    const [privileges, count] = await this.privilegeUseCase.getAllPrivileges(
      {},
      queryPrivilegeDto,
    );

    const data = privileges.map(
      (privilege) => new PrivilegeResponseDto(privilege),
    );

    return new ResponseDto('Privileges Fetched', data, {
      count,
      page,
      size,
    });
  }

  @Get(':privilegeId')
  @ApiOperation({ summary: 'Get privilege by id' })
  @ApiCustomResponse(PrivilegeResponseDto)
  async findOne(@Param('privilegeId', ParseIntPipe) privilegeId: number) {
    return new ResponseDto(
      'Privilege Fetched',
      new PrivilegeResponseDto(
        await this.privilegeUseCase.getPrivilegeById(privilegeId),
      ),
    );
  }
}
