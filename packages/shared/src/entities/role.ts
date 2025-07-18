export interface IRole {
    id: string;
    roleId?: string | null;
    name: string;
    description?: string | null;
    isActive?: boolean | null;
    isPublic?: boolean | null;
    permissions: string[];
    organizationId?: string | null;
    createdAt: Date;
    updatedAt: Date;
}