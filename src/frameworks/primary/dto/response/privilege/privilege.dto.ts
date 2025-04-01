import {ApiProperty} from '@nestjs/swagger';

export class PrivilegeResponseDto {
  @ApiProperty()
  privilegeId: number;

  @ApiProperty()
  privilegeName: string;

  @ApiProperty()
  privilegeSubName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(data: PrivilegeResponseDto) {
    Object.assign(this, data);
  }
}
