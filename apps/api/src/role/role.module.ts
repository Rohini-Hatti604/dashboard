import { Global, Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Global()
@Module({

  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule { }
