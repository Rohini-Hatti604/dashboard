import { TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { GrpcService } from 'src/grpc/grpc.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private grpcService: GrpcService) { }
  @TypedRoute.Get('get-user-details')
  public getUserDetails(@User() user: any): Promise<any> {
    return user;
  }

  @TypedRoute.Post('logout')
  public async logout(@User() user: any): Promise<any> {
    return this.grpcService.logout(JSON.parse(user.session_id));
  }
}
