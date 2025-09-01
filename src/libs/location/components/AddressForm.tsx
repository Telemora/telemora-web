import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Form, Input, Select, SelectItem, Switch } from '@heroui/react';
import { FaGear, FaLocationDot } from 'react-icons/fa6';
import { useCitiesByState, useCountries, useStatesByCountry } from '@/libs/location/hooks';
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
  const addressForm = useForm<AddressDto>({
    resolver: zodResolver(createAddressSchema),
  });

  const { register, watch, setValue } = addressForm;

  const { webApp, isLoaded } = useTelegramWebApp();
  const router = useRouter();

  const countryId = watch('country.id');
  const stateId = watch('state.id');

  const { data: countries = [], isLoading: loadingCountries } = useCountries();
  const { data: states = [], isLoading: loadingStates } = useStatesByCountry(countryId);
  const { data: cities = [], isLoading: loadingCities } = useCitiesByState(stateId);

  useEffect(() => {
    webApp?.LocationManager.init();
  }, [webApp?.LocationManager]);

  if (!webApp) {
    return null;
  }

  const openSettings = () => {
    webApp.LocationManager.openSettings();
  };

  const detectLocation = async () => {
    if (webApp.LocationManager.isAccessRequested) {
      if (!webApp.LocationManager.isLocationAvailable) {
        toast.error('Location is not supported on your device');
      }
      if (!webApp.LocationManager.isAccessGranted) {
        toast.error('Location access is not granted');
      }
    }
    webApp.LocationManager.getLocation((data) => {
      setValue('geoPoint.latitude', data?.latitude);
      setValue('geoPoint.longitude', data?.longitude);
    });
  };

  return (
    <FormProvider {...addressForm}>
      <Form onSubmit={addressForm.handleSubmit(onSubmit)}>
        <pre>isInited: {webApp.LocationManager.isInited || 'unavailable'}</pre>
        <pre>
          isLocationAvailable: {webApp.LocationManager.isLocationAvailable || 'unavailable'}
        </pre>
        <pre>isAccessRequested: {webApp.LocationManager.isAccessRequested || 'unavailable'}</pre>
        <pre>isAccessGranted: {webApp.LocationManager.isAccessGranted || 'unavailable'}</pre>
        <pre>version: {webApp.version}</pre>
        <Input {...register('label')} label="Label" />
        <div className="mb-4 flex gap-4">
          <Button
            fullWidth
            size="sm"
            variant="flat"
            type="button"
            onPress={detectLocation}
            startContent={<FaLocationDot />}
          >
            Use Telegram Location
          </Button>

          <Button
            fullWidth
            size="sm"
            variant="flat"
            type="button"
            onPress={openSettings}
            startContent={<FaGear />}
          >
            Open Telegram Settings
          </Button>
        </div>
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
