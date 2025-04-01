import {Privilege} from '../privilege/privilege.domain';

export type CreateRoleProps = {
  roleName: string;
  privileges?: Privilege[];
};

export type UpdateRoleProps = Partial<CreateRoleProps>;
