import { IUserVariable } from '@clean-start-dashboard/shared';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IGetUserVariable extends IUserVariable { }
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreateUserVariableRequest
  extends Omit<
    IUserVariable,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'ownerId'
    | 'organizationId'
    | 'type'
    | 'scope'
  > {
  type: 'TEXT' | 'NUMERICAL' | 'TIME_BASED';
  scope: 'ORGANIZATION' | 'DASHBOARD';
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUpdateUserVariableRequest
  extends Omit<
    IUserVariable,
    'createdAt' | 'updatedAt' | 'ownerId' | 'organizationId' | 'type' | 'scope'
  > {
  type: 'TEXT' | 'NUMERICAL' | 'TIME_BASED';
  scope: 'ORGANIZATION' | 'DASHBOARD';
}

export interface IGetUserVariableRequest {
  id: string;
}
