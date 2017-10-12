/**
 * IRequest is an interface for sended to server objects
 */

export interface IRequest<T>  {
  jsonrpc: string;
  id: number;
  cred: {};
  method: string;
  params?: T;
}
