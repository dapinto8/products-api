export interface GenericRepository<T, Q> {
  findById(id: number): Promise<T | null>;
  findAll(query: Q): Promise<[T[], number]>;
}