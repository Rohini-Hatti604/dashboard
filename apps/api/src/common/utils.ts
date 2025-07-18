import { Prisma } from '@clean-start-dashboard/database';
import { IListEntitiesRequest } from './dtos';
/**
 * Convert a list request to prisma find many args
 * @param request The request to convert
 * @returns The prisma find many args
 */
export function listRequestToFindManyArgs<M, E>(
  request: IListEntitiesRequest<E>,
  searchFields: (keyof E)[] = [],
): Prisma.Args<M, 'findMany'> {
  const whereSearch =
    request.search && searchFields.length > 0
      ? {
        OR: searchFields.map((field) => {
          return {
            [field]: {
              contains: request.search,
              mode: 'insensitive',
            },
          };
        }),
      }
      : undefined;

  return {
    where:
      request.filters || whereSearch
        ? {
          AND: [
            ...(request.filters ? [request.filters] : []),
            ...(whereSearch ? [whereSearch] : []),
          ],
        }
        : undefined,
    orderBy: request.sort
      ? {
        [request.sort.field]: request.sort.direction,
      }
      : undefined,
    skip: request.skip ?? undefined,
    take: request.take ?? undefined,
  } as Prisma.Args<M, 'findMany'>;
}

/**
 * Convert all null values in an object to undefined
 * @param value The value to convert
 * @returns The value with null converted to undefined
 */
export type NullToUndefined<T> = T extends null
  ? undefined
  : T extends object
  ? T extends Date
  ? T
  : { [K in keyof T]: NullToUndefined<T[K]> }
  : T;
export function nullToUndefined<T>(value: T): NullToUndefined<T> {
  if (value === null) {
    return undefined as NullToUndefined<T>;
  }
  if (Array.isArray(value)) {
    return value.map((item) => nullToUndefined(item)) as NullToUndefined<T>;
  }
  if (typeof value === 'object' && !(value instanceof Date)) {
    return Object.keys(value).reduce((acc, key) => {
      acc[key] = nullToUndefined(value[key]);
      return acc;
    }, {} as any);
  }
  return value as NullToUndefined<T>;
}
