import httpClient from '@/libs/common/utils/httpClient';
import {
  generateMockCities,
  generateMockCountries,
  generateMockStates,
} from '@/libs/location/mocks';
import { NearestLocationResponseDto } from '../types';

export async function getCountries() {
  return generateMockCountries();
}

export async function getStatesByCountry(countryId: number) {
  return generateMockStates();
}

export async function getCitiesByState(stateId: number) {
  return generateMockCities();
}

export async function getNearestLocation(lat: number, lng: number) {
  return httpClient.get<NearestLocationResponseDto>(`/locations/nearest?lat=${lat}&lng=${lng}`);
}
