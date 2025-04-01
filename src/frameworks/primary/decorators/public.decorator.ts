import {SetMetadata} from '@nestjs/common';
import {IS_PUBLIC_KEY} from 'src/common/constants/constant.index';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
