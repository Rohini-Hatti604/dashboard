import type { Format } from "typia/lib/tags/Format";

export type IDashboardCategory = {
  id: string;
  name: string;
  isPublic?: null | undefined | boolean;
  ownerId?: null | undefined | string;
  organizationId?: null | undefined | string;
  dashboards?: undefined | any[];
  createdAt: string & Format<"date-time">;
  updatedAt: string & Format<"date-time">;
};
