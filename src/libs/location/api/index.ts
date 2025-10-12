import httpClient from '@/libs/common/utils/httpClient';
import { CanonicalLocationDto, NearestLocationResponseDto } from '@/libs/location/types';

export async function getCountries() {
  return httpClient.get<CanonicalLocationDto[]>(`/locations/countries`);
}

export async function getStatesByCountry(countryId: string) {
  return httpClient.get<CanonicalLocationDto[]>(`/locations/countries/${countryId}/states`);
}

export async function getCitiesByState(stateId: string) {
  return httpClient.get<CanonicalLocationDto[]>(`/locations/states/${stateId}/cities`);
}

export async function getNearestLocation(lat: number, lng: number) {
  return httpClient.get<NearestLocationResponseDto>(`/locations/nearest?lat=${lat}&lng=${lng}`);
}
