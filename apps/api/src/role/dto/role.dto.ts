import { IRole } from '@clean-start-dashboard/shared';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IGetRole extends IRole { }
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreateRoleRequest
  extends Omit<
    IRole,
    | 'id'
    | 'roleId'
    | 'createdAt'
    | 'updatedAt'
  > { }

export interface IUpdateRoleRequest
  extends ICreateRoleRequest {
  id: string;
}

export interface IGetRoleRequest {
  id: string;
}
