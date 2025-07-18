export interface IUserVariable {
  id: string;
  key: string;
  value: string;
  type: string;
  scope: string;
  isPublic?: boolean | null;
  organizationId?: string | null;
  dashboardId?: string | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
