export type ICreateRoleRequest = {
  name: string;
  isPublic?: null | undefined | boolean;
  description?: null | undefined | string;
  permissions: string[];
  isActive?: null | undefined | boolean;
  organizationId?: null | undefined | string;
};
