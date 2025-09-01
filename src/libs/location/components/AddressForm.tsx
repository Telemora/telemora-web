import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button, Form, Input, Select, SelectItem, Switch } from '@heroui/react';
import { FaGear, FaLocationDot } from 'react-icons/fa6';
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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddressDto>({
    resolver: zodResolver(createAddressSchema),
  });

  const { webApp, isLoaded } = useTelegramWebApp();
  const router = useRouter();
  const [coords, setCoords] = useState<{ lat?: number; lng?: number } | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectError, setDetectError] = useState<string | null>(null);

  const countryId = watch('country.id');
  const stateId = watch('state.id');

  const { data: nearest, isFetching: nearestLoading } = useNearestLocation(
    coords?.lat,
    coords?.lng,
  );
  const { data: countries = [], isLoading: loadingCountries } = useCountries();
  const { data: states = [], isLoading: loadingStates } = useStatesByCountry(countryId);
  const { data: cities = [], isLoading: loadingCities } = useCitiesByState(stateId);

  useEffect(() => {
    if (nearest && coords) {
      setValue('country.id', nearest.country.id);
      if (nearest.state?.id) setValue('state.id', nearest.state.id);
      if (nearest.city?.id) {
        setValue('city.id', nearest.city.id);
        setValue('postalCode', nearest.city.postalCode ?? '');
      }
      setValue('geoPoint.latitude', coords.lat);
      setValue('geoPoint.longitude', coords.lng);
    }
  }, [nearest, coords, setValue, webApp?.LocationManager]);

  const detectLocation = async () => {
    webApp?.LocationManager.init();

    const isSupported = webApp?.LocationManager.isLocationAvailable;
    const isAccessGranted = webApp?.LocationManager.isAccessGranted;

    if (!isSupported) {
      toast.error('Location detection is not supported.');
      return;
    }

    if (!isAccessGranted) {
      toast.error('Location access is denied.');
      return;
    }

    setIsDetecting(true);
    setDetectError(null);

    try {
      webApp?.LocationManager.getLocation((data) => {
        setCoords({ lat: data?.latitude, lng: data?.longitude });
      });
    } catch (err) {
      console.error(err);
      if (!isAccessGranted) {
        setDetectError('Telegram denied location access. Please enable it in settings.');
      } else {
        setDetectError('Location detection failed. Please try manually.');
      }
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <pre>isInited: {webApp?.LocationManager.isInited || 'unavailable'}</pre>
      <pre>isLocationAvailable: {webApp?.LocationManager.isLocationAvailable || 'unavailable'}</pre>
      <pre>isAccessRequested: {webApp?.LocationManager.isAccessRequested || 'unavailable'}</pre>
      <pre>isAccessGranted: {webApp?.LocationManager.isAccessGranted || 'unavailable'}</pre>
      <pre>version: {webApp?.version}</pre>
      <Input {...register('label')} label="Label" />
      <div className="mb-4 flex gap-4">
        <Button
          fullWidth
          size="sm"
          variant="flat"
          onPress={detectLocation}
          startContent={<FaLocationDot />}
        >
          Use Telegram Location
        </Button>

        <Button
          fullWidth
          size="sm"
          variant="flat"
          onPress={() => webApp?.LocationManager.openSettings()}
          startContent={<FaGear />}
        >
          Open Telegram Settings
        </Button>
      </div>
      <CanonicalLocationForm reg={register} data={countries} type={CanonicalLocationType.COUNTRY} />
      <CanonicalLocationForm reg={register} data={states} type={CanonicalLocationType.STATE} />
      <CanonicalLocationForm reg={register} data={cities} type={CanonicalLocationType.CITY} />
      <Input {...register('streetLine1')} label="Street Line 1" />
      <Input {...register('streetLine2')} label="Street Line 2" />
      <Input {...register('postalCode')} label="Postal Code" />
      <Select {...register('type')} label="Type">
        {Object.values<string>(AddressType).map((type) => (
          <SelectItem key={type}>{type}</SelectItem>
        ))}
      </Select>
      <GeoPointForm register={register} />
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
  );
}
