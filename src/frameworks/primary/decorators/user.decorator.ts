import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
