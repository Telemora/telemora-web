'use client';

import { useEffect, useState } from 'react';
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
  const [isAccessRequested, setIsAccessRequested] = useState<boolean>(false);
  const [isAccessGranted, setIsAccessGranted] = useState<boolean>(false);

  const countryId = watch('country.id');
  const stateId = watch('state.id');
  const longitude = watch('geoPoint.longitude');
  const latitude = watch('geoPoint.latitude');

  const { data: countries = [], isLoading: loadingCountries } = useCountries();
  const { data: states = [], isLoading: loadingStates } = useStatesByCountry(countryId);
  const { data: cities = [], isLoading: loadingCities } = useCitiesByState(stateId);
  const { data: nearest, isFetching: nearestLoading } = useNearestLocation(latitude, longitude);

  useEffect(() => {
    webApp?.LocationManager.init(() => {
      const isInited = webApp?.LocationManager.isInited;
      const isLocationAvailable = webApp?.LocationManager.isLocationAvailable;

      setIsAccessRequested(webApp?.LocationManager.isAccessRequested);
      setIsAccessGranted(webApp?.LocationManager.isAccessGranted);

      if (!isInited) throw new Error('LocationManager is not initialized');
      if (!isLocationAvailable) toast.error('Location is not available');
    });
  }, [webApp, webApp?.LocationManager]);

  useEffect(() => {
    if (!nearest) return;
    setValue('country', nearest.country);
    setValue('state', nearest.state);
    setValue('city', nearest.city);
  }, [nearest, setValue]);

  const detectLocation = async () => {
    webApp?.LocationManager.getLocation((data) => {
      if (!data) {
        onOpenSettingsModal();
      }
      setValue('geoPoint.latitude', data?.latitude);
      setValue('geoPoint.longitude', data?.longitude);
    });
  };

  const onAllowAccess = async () => {
    await detectLocation();
    onClose();
  };

  return (
    <FormProvider {...addressForm}>
      {!isAccessGranted && (
        <Alert
          color="primary"
          title="Allow Location Access"
          description="Allow geolocation access in your settings"
          endContent={
            <Button color="primary" size="sm" onPress={onOpenSettingsModal}>
              Open Settings
            </Button>
          }
        />
      )}
      {!isAccessRequested && (
        <Alert
          color="danger"
          title="Allow Location Access"
          description="Allow location access to help fill out this form"
          endContent={
            <Button color="primary" size="sm" onPress={onAllowAccess}>
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
