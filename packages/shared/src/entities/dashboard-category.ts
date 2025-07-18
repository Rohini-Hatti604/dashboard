export interface IDashboardCategory {
  id: string;
  name: string;
  isPublic?: boolean | null;
  ownerId?: string | null;
  organizationId?: string | null;
  dashboards?: any[];
  createdAt: Date;
  updatedAt: Date;
}
