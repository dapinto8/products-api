export interface GenericRepository<T, Q> {
  findById(id: number): Promise<T>;
  findAll(query: Q): Promise<[T[], number]>;
}