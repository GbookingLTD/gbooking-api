/**
 * IResponce is an interface for server responces
 */

export interface IResponce<T> {
  jsonrpc: string;
  id: number;
  result: T;
}
