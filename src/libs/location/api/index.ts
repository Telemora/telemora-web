import httpClient from '@/libs/common/utils/httpClient';
import {
  generateMockCities,
  generateMockCountries,
  generateMockStates,
} from '@/libs/location/mocks';

import { isDev } from '../../common/utils';
import { CanonicalLocationDto, NearestLocationResponseDto } from '../types';

export async function getCountries() {
  return isDev
    ? generateMockCountries()
    : httpClient.get<CanonicalLocationDto[]>(`/locations/countries`);
}

export async function getStatesByCountry(countryId: number) {
  return isDev
    ? generateMockStates()
    : httpClient.get<CanonicalLocationDto[]>(`countries/${countryId}/states`);
}

export async function getCitiesByState(stateId: number) {
  return isDev
    ? generateMockCities()
    : httpClient.get<CanonicalLocationDto[]>(`states/${stateId}/cities`);
}

export async function getNearestLocation(lat: number, lng: number) {
  return httpClient.get<NearestLocationResponseDto>(`/locations/nearest?lat=${lat}&lng=${lng}`);
}
