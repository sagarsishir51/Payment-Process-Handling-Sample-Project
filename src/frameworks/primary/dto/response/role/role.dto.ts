import {ApiProperty, PickType} from '@nestjs/swagger';
import {PrivilegeResponseDto} from '../privilege/privilege.dto';

export class RolePrivilegeResponseDto extends PickType(PrivilegeResponseDto, [
  'privilegeId',
  'privilegeName',
  'privilegeSubName',
] as const) {
  constructor({
    privilegeId,
    privilegeName,
    privilegeSubName,
  }: RolePrivilegeResponseDto) {
    super();
    Object.assign(this, { privilegeId, privilegeName, privilegeSubName });
  }
}

export class RoleResponseDto {
  @ApiProperty()
  roleId: number;

  @ApiProperty()
  roleName: string;

  @ApiProperty({ type: [RolePrivilegeResponseDto] })
  privileges: RolePrivilegeResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor({ privileges, ...data }: RoleResponseDto) {
    Object.assign(this, data);

    this.privileges = privileges.map(
      (privilege) => new RolePrivilegeResponseDto(privilege),
    );
  }
}
