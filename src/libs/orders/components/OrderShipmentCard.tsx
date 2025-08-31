import { OrderShipment } from '@/libs/orders/types';
import { PageHeader } from '@/libs/common/components/PageHeader';
import { formatSafeDate } from '@/libs/common/utils/date';

export function OrderShipmentCard({ shipment }: { shipment: OrderShipment }) {
  if (!shipment) {
    return null;
  }

  return (
    <>
      <PageHeader title="Shipment Details" />

      <div className="bg-content1 grid grid-cols-2 gap-3 rounded-lg p-4 text-sm shadow">
        <span className="text-default-600">Tracking Number</span>
        <span className="truncate">{shipment.trackingNumber}</span>

        <span className="text-default-600">Courier Service</span>
        <span>{shipment.courierService}</span>

        <span className="text-default-600">Status</span>
        <span>{shipment.status || 'unknown'}</span>

        <span className="text-default-600">Expected Delivery</span>
        <span>{formatSafeDate(shipment.expectedDeliveryDate)}</span>

        <span className="text-default-600">Shipped At</span>
        <span>{formatSafeDate(shipment.shippedAt)}</span>

        {shipment.carrierTrackingUrl && (
          <div className="flex flex-col">
            <span className="text-default-600">Track Shipment</span>
            <a
              href={shipment.carrierTrackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Click here to track
            </a>
          </div>
        )}
      </div>
    </>
  );
}
