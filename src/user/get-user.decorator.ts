import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { User } from './user.model';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    if(req.user) return req.user.id;
    else throw new UnauthorizedException()
  },
);
