// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log(roles,"roles in guard")
        if (!roles) {
            return true;  // Allow access if no roles are specified
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(user,"users in guard")

        return user && user.role && roles.includes(user.role);
    }
}
