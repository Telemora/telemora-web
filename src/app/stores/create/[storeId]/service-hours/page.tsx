'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
} from '@heroui/react';
import { useSubmitStoreServiceHoursMutation } from '@/libs/stores/hooks';
import { ServiceHoursDto, SetStoreServiceHoursDto, Weekday } from '@/libs/stores/types';
import { serviceHoursDtoSchema, setStoreServiceHoursSchema } from '@/libs/stores/schemas';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { hapticFeedback } from '@telegram-apps/sdk-react';

export function SetStoreServiceHours() {
  const router = useRouter();
  const { storeId } = useParams<{ storeId: string }>();
  const { mutateAsync, isPending } = useSubmitStoreServiceHoursMutation(storeId);

  const [serviceHours, setServiceHours] = useState<ServiceHoursDto[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newHour, setNewHour] = useState<ServiceHoursDto>({
    day: Weekday.MONDAY,
    open: '09:00',
    close: '17:00',
    interval: 30,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const weekdayOptions = Object.values(Weekday).map((day) => ({
    value: day,
    label: day.charAt(0).toUpperCase() + day.slice(1).toLowerCase(),
  }));

  const handleAddOrUpdate = () => {
    try {
      serviceHoursDtoSchema.parse(newHour);

      // Check for duplicate days
      if (serviceHours.some((hour, index) => hour.day === newHour.day && index !== editIndex)) {
        setError('This day already has service hours defined.');
        return;
      }

      if (editIndex !== null) {
        const updatedHours = [...serviceHours];
        updatedHours[editIndex] = newHour;
        setServiceHours(updatedHours);
      } else {
        setServiceHours([...serviceHours, newHour]);
      }
      setIsDialogOpen(false);
      setNewHour({
        day: Weekday.MONDAY,
        open: '09:00',
        close: '17:00',
        interval: 30,
      });
      setEditIndex(null);
      setError(null);
    } catch (err) {
      setError('Invalid input. Please check the fields.');
    }
  };

  const handleEdit = (index: number) => {
    setNewHour(serviceHours[index]);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleDelete = (index: number) => {
    setServiceHours(serviceHours.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const data: SetStoreServiceHoursDto = { serviceHours };
      setStoreServiceHoursSchema.parse(data);
      await mutateAsync(data);
      toast.success('Working hours saved');
      hapticFeedback.impactOccurred('light');
      router.push(`/stores/create/${storeId}/logo-upload`);
    } catch {
      toast.error('Failed to save service hours. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
        {editIndex !== null ? 'Edit' : 'Manage'} Store Service Hours
      </h1>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <div style={{ marginBottom: '20px' }}>
        <Button
          color="primary"
          onPress={() => {
            setNewHour({
              day: Weekday.MONDAY,
              open: '09:00',
              close: '17:00',
              interval: 30,
            });
            setEditIndex(null);
            setIsDialogOpen(true);
          }}
        >
          Add Service Hours
        </Button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {serviceHours.length === 0 ? (
          <p>No service hours defined.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {serviceHours.map((hour, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                <span>
                  {hour.day.charAt(0).toUpperCase() + hour.day.slice(1).toLowerCase()}: {hour.open}{' '}
                  - {hour.close}, Interval: {hour.interval} min
                </span>
                <div>
                  <Button
                    color="secondary"
                    onPress={() => handleEdit(index)}
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button color="danger" onPress={() => handleDelete(index)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button color="primary" onPress={handleSubmit} disabled={isPending} style={{ width: '100%' }}>
        {isPending ? 'Saving...' : 'Save Service Hours'}
      </Button>

      <Modal open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <ModalHeader>{editIndex !== null ? 'Edit Service Hours' : 'Add Service Hours'}</ModalHeader>
        <ModalContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Select
              label="Day"
              options={weekdayOptions}
              value={newHour.day}
              onChange={(value) => setNewHour({ ...newHour, day: value as Weekday })}
            />
            <Input
              label="Open Time"
              type="time"
              value={newHour.open}
              onChange={(e) => setNewHour({ ...newHour, open: e.target.value })}
            />
            <Input
              label="Close Time"
              type="time"
              value={newHour.close}
              onChange={(e) => setNewHour({ ...newHour, close: e.target.value })}
            />
            <Input
              label="Interval (minutes)"
              type="number"
              value={newHour.interval.toString()}
              onChange={(e) => setNewHour({ ...newHour, interval: parseInt(e.target.value) || 30 })}
            />
          </div>
        </ModalContent>
        <ModalFooter>
          <Button color="secondary" onPress={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleAddOrUpdate}>
            {editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
