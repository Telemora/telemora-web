'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, Button, Form, Input, Select, SelectItem, Switch } from '@heroui/react';
import {
  useCitiesByState,
  useCountries,
  useNearestLocation,
  useStatesByCountry,
} from '@/libs/location/hooks';
import { CanonicalLocationForm } from '@/libs/location/components/CanonicalLocationForm';
import { GeoPointForm } from '@/libs/location/components/GeoPointForm';
import { AddressDto, AddressType, CanonicalLocationType } from '@/libs/location/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAddressSchema } from '@/libs/location/schemas';
import { useTelegramWebApp } from '@/libs/common/hooks/useTelegramWebApp';
import { StoreCreationStepsNav } from '@/libs/stores/components/StoreCreationStepsNav';
import toast from 'react-hot-toast';

interface Props {
  isPending: boolean;
  onSubmit: (data: AddressDto) => void;
}

export function AddressForm({ isPending, onSubmit }: Props) {
  const { webApp } = useTelegramWebApp();
  const addressForm = useForm<AddressDto>({
    resolver: zodResolver(createAddressSchema),
  });
  const { register, watch, setValue } = addressForm;
  const router = useRouter();

  const countryId = watch('country.id');
  const stateId = watch('state.id');
  const longitude = watch('geoPoint.longitude');
  const latitude = watch('geoPoint.latitude');

  const { data: countries = [], isLoading: loadingCountries } = useCountries();
  const { data: states = [], isLoading: loadingStates } = useStatesByCountry(countryId);
  const { data: cities = [], isLoading: loadingCities } = useCitiesByState(stateId);
  const { data: nearest, isFetching: nearestLoading } = useNearestLocation(latitude, longitude);

  useEffect(() => {
    if (webApp && webApp.LocationManager) {
      webApp.LocationManager.init(() => {
        if (webApp.LocationManager.isLocationAvailable && webApp.LocationManager.isAccessGranted) {
          detectLocation();
        }
      });
    }
    if (nearest) {
      setValue('country.id', nearest.country.id);
      if (nearest.state) setValue('state.id', nearest.state.id);
      if (nearest.city) setValue('city.id', nearest.city.id);
    }
  }, [webApp, setValue, nearest]);

  const detectLocation = () => {
    webApp?.LocationManager.getLocation((data) => {
      if (!data) {
        toast.error('Location access denied. Please enable it in settings.');
        openSettings();
        return;
      }
      setValue('geoPoint.latitude', data.latitude);
      setValue('geoPoint.longitude', data.longitude);
    });
  };

  const openSettings = () => {
    webApp?.LocationManager.openSettings();
  };

  return (
    <FormProvider {...addressForm}>
      {!latitude && !longitude && (
        <Alert
          color="primary"
          description="Allow location access to help fill out this form"
          endContent={
            <Button size="sm" color="primary" onPress={detectLocation}>
              Allow Access
            </Button>
          }
        />
      )}
      <Form onSubmit={addressForm.handleSubmit(onSubmit)}>
        <Input {...register('label')} label="Label" />
        <CanonicalLocationForm data={countries} type={CanonicalLocationType.COUNTRY} />
        <CanonicalLocationForm data={states} type={CanonicalLocationType.STATE} />
        <CanonicalLocationForm data={cities} type={CanonicalLocationType.CITY} />
        <Input {...register('streetLine1')} label="Street Line 1" />
        <Input {...register('streetLine2')} label="Street Line 2" />
        <Input {...register('postalCode')} label="Postal Code" />
        <Select {...register('type')} label="Type">
          {Object.values<string>(AddressType).map((type) => (
            <SelectItem key={type}>{type}</SelectItem>
          ))}
        </Select>
        <GeoPointForm />
        <div className="my-2 flex w-full items-center justify-between">
          <label className="text-xs">Save as Default location</label>
          <Switch {...register('isDefault')} />
        </div>

        {/* Buttons */}
        <StoreCreationStepsNav>
          <Button type="button" onPress={() => router.back()}>
            Back
          </Button>
          <Button type="submit" color="primary" isLoading={isPending}>
            Save & Continue
          </Button>
        </StoreCreationStepsNav>
      </Form>
    </FormProvider>
  );
}
