import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { } // for getting values from @SetMetadata('roles', 'admin').

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const user = {
            name: "Siddhesh",
            roles: ['admin'],
        }

        // getting values from @SetMetadata() decorator.
        const roles = this.reflector.get<string>('roles', context.getHandler());
        console.log("roles:---->", roles);

        console.log("111", !roles);
        if (!roles) {
            return true;
        }

        const requiredRoles = "admin";

        console.log("222", !user.roles.includes(requiredRoles));
        if (!user.roles.includes(requiredRoles)) {
            // throw new UnauthorizedException("User Not Admin");
            return false; // guard handles and give appropriate error msg
        }

        return true;
    }
}
