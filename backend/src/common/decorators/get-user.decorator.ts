import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../auth/types';
import type { Request } from 'express';

type RequestWithUser = Request & { user?: unknown };

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload | null => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user as JwtPayload | undefined;
    return user ?? null;
  },
);
