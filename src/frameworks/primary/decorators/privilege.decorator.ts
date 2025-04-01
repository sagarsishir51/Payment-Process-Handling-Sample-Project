import {SetMetadata} from '@nestjs/common';
import {PRIVILEGE_KEY} from 'src/common/constants/constant.index';
import {PRIVILEGE_SUBNAME} from 'src/common/enums/privilege/privilege.enum';

export const Privileges = (...privileges: PRIVILEGE_SUBNAME[]) =>
  SetMetadata(PRIVILEGE_KEY, privileges);
