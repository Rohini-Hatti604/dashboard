import type { Format } from "typia/lib/tags/Format";

import type { IDashboardCategory } from "./IDashboardCategory";
import type { IDashboardElement } from "./IDashboardElement";

export type IDashboard = {
  id: string;
  name: string;
  tags?: undefined | string[];
  isPublic?: undefined | boolean;
  parentId?: null | undefined | string;
  parent?: undefined | IDashboard;
  type?: null | undefined | string;
  children?: any | undefined;
  ownerId?: null | undefined | string;
  dashboardCategoryId: string;
  dashboardCategory?: undefined | IDashboardCategory;
  elements?: undefined | IDashboardElement[];
  createdAt: string & Format<"date-time">;
  updatedAt: string & Format<"date-time">;
};
