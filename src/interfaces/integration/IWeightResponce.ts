/**
 * IWeightResponce an interface
 * for describing of server responce on resource.get_workload_weights
 */

export interface IWeightResponce {
  businessId: number;
  weights: IResourceWeight[];
}

export interface IResourceWeight {
  resourceId: string;
  weight: number;
}
