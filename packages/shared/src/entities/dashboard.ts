import { IDashboardCategory } from "./dashboard-category";

export interface IDashboard {
  id: string;
  name: string;
  tags?: string[];
  isPublic?: boolean;
  parentId?: string | null;
  parent?: IDashboard;
  type?: "DEFAULT" | "DRILLDOWN" | string | null;
  children?: IDashboard[] | any;
  ownerId?: string | null;
  dashboardCategoryId: string;
  dashboardCategory?: IDashboardCategory;
  elements?: IDashboardElement[];
  //timestamp
  createdAt: Date;
  updatedAt: Date;
}

export interface IDashboardElement {
  key?: string | null;
  x: number;
  y: number;
  w: number;
  h: number;
  widgetId: string | null | undefined;
  widget?: any | null;
}
