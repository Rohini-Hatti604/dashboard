import { Module } from '@nestjs/common';
import { UserVariableController } from './user-variable.controller';
import { UserVariableService } from './user-variable.service';

@Module({
  providers: [UserVariableService],
  controllers: [UserVariableController],
})
export class UserVariableModule { }
