export interface IDashboardProfile {
  id: string;
  favouriteDashboards?: string[];
  defaultDashboards?: any;
  user?: any;
  defaultDashboardId?: string;
  opensearchConfig?: any;
  //timestamp
  createdAt: Date;
  updatedAt: Date;
}

export interface IOpensearchConfig {
  nodeUrl: string;
  logIndex: string;
  alertIndex: string;
}
