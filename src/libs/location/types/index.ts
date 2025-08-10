/**
 * Defines the type of canonical location entity.
 * Used for categorizing countries, states, and cities.
 */
export enum CanonicalLocationType {
  COUNTRY = 'country',
  STATE = 'state',
  CITY = 'city',
}

/**
 * Enum to distinguish different address use cases in the system.
 */
export enum AddressType {
  USER = 'user',
  STORE = 'store',
  SHIPPING = 'shipping',
  BILLING = 'billing',
  PICKUP = 'pickup',
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface CanonicalLocationDto {
  id: number;
  name: string;
  type: CanonicalLocationType;
  parentId?: number;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressDto {
  id: number;
  label?: string;
  country: CanonicalLocationDto;
  state?: CanonicalLocationDto;
  city?: CanonicalLocationDto;
  streetLine1: string;
  streetLine2?: string;
  postalCode?: string;
  geoPoint: GeoPoint;
  type: AddressType;
  isDefault?: boolean;
}

export interface RegionFilterDto {
  countryId?: number;
  stateId?: number;
  cityId?: number;
}

export interface GeoFilterDto {
  center: GeoPoint;
  radiusKm: number;
}

export interface NearestLocationResponseDto {
  country: CanonicalLocationDto;
  state?: CanonicalLocationDto;
  city?: CanonicalLocationDto;
}

export interface GetNearestLocationQuery extends GeoPoint {
  radius?: number;
  limit?: number;
}
