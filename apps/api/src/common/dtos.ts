import { tags } from 'typia';

/**
 * Headers of an authenticated request
 */
export interface IAuthHeaders {
  'x-user-id': string & tags.Pattern<'^[a-fA-F0-9]{24}$'>;
  'x-organization-id'?: string & tags.Pattern<'^[a-fA-F0-9]{24}$'>;
}

// type EntityFilterCommon<V> = { equals?: V } | { not?: V } | { in?: V[] } | { notIn?: V[] };
// type EntityFilterNumeric<V> = EntityFilterCommon<V> | { lt?: V, lte?: V, gt?: V, gte?: V };
// type EntityFilterWithMode<T> = T & { mode?: 'insensitive'|'default' };
// type EntityFilterString<V> = EntityFilterCommon<V> | EntityFilterWithMode<{ contains?: string } | { startsWith?: string } | { endsWith?: string }>;

type EntityFilterRecord = {
  equals?: string | number | Date | boolean;
  not?: string | number | Date | boolean;
  in?: (string | number | Date | boolean)[];
  notIn?: (string | number | Date | boolean)[];
  lt?: number | Date | string;
  lte?: number | Date | string;
  gt?: number | Date | string;
  gte?: number | Date | string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: 'insensitive' | 'default';
};
type ComparableAttributes<T> = {
  [K in keyof T]: T[K] extends number | Date | string | boolean ? K : never;
}[keyof T];
export type EntityFilterInput<
  E,
  K extends ComparableAttributes<E> = ComparableAttributes<E>,
> = Record<K | string, EntityFilterRecord | undefined>;

export type EntitySortInput<E> = {
  field: keyof E | string;
  direction: 'asc' | 'desc';
};

export interface IListEntitiesRequest<E> {
  filters?: EntityFilterInput<NonNullable<E>>;
  sort?: EntitySortInput<E>;
  search?: string;
  skip?: number;
  take?: number;
}

export interface IListEntitiesResponse<E> {
  total: number;
  items: E[];
}
