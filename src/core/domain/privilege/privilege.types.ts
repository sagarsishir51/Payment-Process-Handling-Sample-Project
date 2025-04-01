import {PRIVILEGE_NAME, PRIVILEGE_SUBNAME,} from 'src/common/enums/privilege/privilege.enum';
import {Role} from '../role/role.domain';

export type CreatePrivilegeProps = {
  privilegeName: PRIVILEGE_NAME;
  privilegeSubName: PRIVILEGE_SUBNAME;
  roles?: Role[];
};

export type UpdatePrivilegeProps = Partial<CreatePrivilegeProps>;
