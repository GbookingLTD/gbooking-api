/**
 * description of server responce on extra fields request, it is element from array in responce
 */

export interface IExtraFieldsResponce {
  field: {
    id: string,
    name: string,
    value: string,
    fieldType: string,
    dropDownItems?: {
      name: string,
      value: string,
    } [],
  };
}
