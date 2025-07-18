import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import { GrpcService } from 'src/grpc/grpc.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(private grpcService: GrpcService, private roleService: RoleService) { }

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const session$ = this.grpcService.getUserDetails(request.headers.session_id);

    return session$.pipe(
      switchMap((res) => {
        if (!res.status) {
          this.logger.error('Unauthorized' + JSON.stringify(res));
          throw new UnauthorizedException('Session expired');
        }

        const responseData = JSON.parse(res.response_data)?.data;

        // if (responseData?.user_data?.idp_data) {
        //   request['user'] = {
        //     ...responseData,
        //     user_data: {
        //       idp_data: responseData?.user_data?.idp_data,
        //       ...responseData?.user_data?.session_response,
        //     },
        //   };
        //   this.logger.log('User Authenticated');
        //   return from([true]); // Observable boolean
        // }

        console.log(responseData?.user_data?.roles);


        return from(this.roleService.getByName(responseData?.user_data?.roles?.role_id)).pipe(
          map((role) => {
            request['user'] = {
              ...responseData, role: role ?? {
                "id": "67ed072c6eb8ca8d73680464",
                "name": "moderator",
                "description": null,
                "permissions": [
                  "dashboard.view",
                  "category.view",
                  "widget.view",
                  "variable.view",
                  "search.view",
                  "alert.view",
                  "dashboard.modify",
                  "dashboard.delete",
                  "dashboard.create",
                  "category.modify",
                  "category.create",
                  "widget.modify",
                  "variable.modify",
                  "variable.create"
                ],
                "createdAt": "2025-04-02T09:45:16.933Z",
                "updatedAt": "2025-04-15T11:36:02.965Z"
              }
            };
            this.logger.log('User Authenticated');
            return true;
          })
        );
      })
    );
  }
}
