/**
 * Appointment is certain app data structure
 */

import { ILocation, IProfile, IResource, ITaxonomy } from 'src/interfaces/integration';

export interface IAppointment {
  location?: ILocation;
  client?: IProfile;
  resource?: IResource;
  taxonomy?: ITaxonomy;
  start?: number;
  duration?: number;
  end?: number;
}
