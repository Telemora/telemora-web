import {
  generateMockCities,
  generateMockCountries,
  generateMockNearestLocation,
  generateMockStates,
} from '@/libs/location/mocks';

export async function getCountries() {
  return generateMockCountries(); /* httpClient.get<CanonicalLocationDto[]>(`/locations/countries`); */
}

export async function getStatesByCountry(countryId: number) {
  return generateMockStates(); /* httpClient.get<CanonicalLocationDto[]>(`/locations/countries/${countryId}/states`); */
}

export async function getCitiesByState(stateId: number) {
  return generateMockCities(); /* httpClient.get<CanonicalLocationDto[]>(`/locations/states/${stateId}/cities`); */
}

export async function getNearestLocation(lat: number, lng: number) {
  return generateMockNearestLocation(); /* httpClient.get<NearestLocationResponseDto>(`/locations/nearest?lat=${lat}&lng=${lng}`); */
}
