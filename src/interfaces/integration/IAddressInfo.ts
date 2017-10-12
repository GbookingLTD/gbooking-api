/**
 * IAddressInfo is a part of IProfileResponce for describing client location
 */
import { IMetroStation } from 'src/interfaces/integration';

export interface IAddressInfo {
  country: string;
  zip_code: string;
  locality: string;
  locality_type: string;
  street: string;
  street_type: string;
    // tslint:disable-next-line:no-reserved-keywords
  number: string;
  admin_area: string;
  admin_area_type: string;
  sub_admin_area: string;
  sub_admin_area_type: string;
  sub_locality: string;
  sub_locality_type: string;
  corps: string;
  building: string;
  possesion: string;
  kilometer: string;
  address: string;
  longitude: string;
  latitude: string;
  metroStations: IMetroStation[];
  zipCode?: string;
  localityType?: string;
  streetType?: string;
  adminArea?: string;
  adminAreaType?: string;
  subAdminArea?: string;
  subAdminAreaType?: string;
  subLocality?: string;
  subLocalityType?: string;
}
