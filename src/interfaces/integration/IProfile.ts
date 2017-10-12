/**
 * IProfile is main user info structure
 */

import { IPhoneNumber } from 'src/interfaces/integration';

export interface IProfile {
  name: string;
  surname?: string;
  phone: IPhoneNumber;
}
