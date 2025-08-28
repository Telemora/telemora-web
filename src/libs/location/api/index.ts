import httpClient from '@/libs/common/utils/httpClient';
import {
  generateMockCities,
  generateMockCountries,
  generateMockStates,
} from '@/libs/location/mocks';
import { NearestLocationResponseDto } from '../types';

export async function getCountries() {
  return generateMockCountries(); /* httpClient.get<CanonicalLocationDto[]>(`/locations/countries`); */
}

export async function getStatesByCountry(countryId: number) {
  return generateMockStates(); /* httpClient.get<CanonicalLocationDto[]>(`countries/${countryId}/states`); */
}

export async function getCitiesByState(stateId: number) {
  return generateMockCities(); /* httpClient.get<CanonicalLocationDto[]>(`states/${stateId}/cities`); */
}

export async function getNearestLocation(lat: number, lng: number) {
  return httpClient.get<NearestLocationResponseDto>(`/locations/nearest?lat=${lat}&lng=${lng}`);
}
