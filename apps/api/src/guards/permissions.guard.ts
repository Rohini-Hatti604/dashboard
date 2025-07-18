import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Permissions } from 'src/decorators/permission.decorator';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class RolesGuard implements CanActivate {
    private readonly logger = new Logger(RolesGuard.name);
    constructor(private roleService: RoleService, private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const userPermissions = request?.user?.role?.permissions ?? []

        const permissions = this.reflector.get(Permissions, context.getHandler());

        if (!permissions) {
            return true;
        }

        const allowed = permissions.some((permission) =>
            userPermissions?.includes(permission)
        );

        if (allowed) {
            return true;

        } else {

            this.logger.error(`User does not have the required permissions: ${permissions}`);
            throw new UnauthorizedException('User does not have the required permissions' + JSON.stringify(permissions));
        }

    }
}
