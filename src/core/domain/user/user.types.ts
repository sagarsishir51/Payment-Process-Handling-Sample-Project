import {Role} from '../role/role.domain';
import {USER_STATUS} from 'src/common/enums/user/user.enum';

export type CreateUserProps = {
  userName?: string;
  email: string;
  phone?: string;
  password: string;
  image?: string;
  userStatus?: USER_STATUS;
  homeAddress?: string;
  employeeNo?: string;
  designation?: string;
  dateOfBirth?: Date;
  signature?: string;
  document?: string;
  role: Role;
};

export type UpdateUserProps = Partial<CreateUserProps>;
