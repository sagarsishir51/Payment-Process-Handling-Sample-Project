import {ApiProperty} from '@nestjs/swagger';
import {USER_STATUS} from 'src/common/enums/user/user.enum';

class UserRoleDto {
  @ApiProperty()
  roleId: number;

  @ApiProperty()
  roleName: string;

  constructor({ roleId, roleName }: UserRoleDto) {
    Object.assign(this, { roleId, roleName });
  }
}

export class UserResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  image: string;


  @ApiProperty({ enum: USER_STATUS })
  userStatus: USER_STATUS;

  @ApiProperty({ type: UserRoleDto })
  role: UserRoleDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor({
    userId,
    userName,
    email,
    phone,
    image,
    userStatus,
    role,
    createdAt,
    updatedAt,
  }: UserResponseDto) {
    Object.assign(this, {
      userId,
      userName,
      email,
      phone,
      image,
      userStatus,
      createdAt,
      updatedAt,
    });

    this.role = new UserRoleDto(role);
  }
}
