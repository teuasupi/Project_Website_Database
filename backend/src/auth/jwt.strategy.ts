import { Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-jwt';
import { JwtPayload } from './types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Implement our own extractor to avoid relying on the extracted helper's types
    // and to keep type-safety for ESLint/TS. This reads the Authorization header
    // and extracts the Bearer token if present.
    const jwtFromRequest = (req: Request): string | null => {
      if (!req || !req.headers) return null;
      const authHeader =
        (req.headers['authorization'] as string) ||
        (req.headers['Authorization'] as string);
      if (!authHeader) return null;
      const parts = authHeader.split(' ');
      if (parts.length !== 2) return null;
      const [scheme, token] = parts;
      if (!/^Bearer$/i.test(scheme)) return null;
      return token;
    };

    // Pass a properly-typed StrategyOptions object so there's no need for casts
    const strategyOptions: StrategyOptions = {
      jwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'change-this',
    };

    // The Passport Strategy constructor expects a loosely-typed options object
    // from passport-jwt. Cast the StrategyOptions to that shape in a narrow,
    // documented way.
    // The Passport Strategy constructor originates from an external library
    // and its types are intentionally broad. Keep a single-line disable for
    // the unsafe-call rule only on this constructor invocation.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super(strategyOptions as unknown as StrategyOptions);
  }

  validate(payload: JwtPayload) {
    // Return payload directly so request.user has sub & email
    return payload;
  }
}
