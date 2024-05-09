import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Role } from '../enums/roles';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // switch context to gqlcontext
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();

    // In a real world application,
    // implement your auth logic here

    // inject user to context so I can access user info anywhere
    ctx.user = {
      role: Role.USER,
    };

    return ctx.req?.headers?.authorization === 'abc';
  }
}
