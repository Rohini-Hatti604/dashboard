import type { IWidgetConfig } from "./IWidgetConfig";

export type ICreateWidgetRequest = {
  access_token?: undefined | string;
  type: string;
  tags?: undefined | string[];
  isPublic?: undefined | boolean;
  title: string;
  renderMethod?: null | undefined | "STATIC" | "DYNAMIC";
  config: IWidgetConfig[];
  widgetCategoryId?: undefined | string;
};
