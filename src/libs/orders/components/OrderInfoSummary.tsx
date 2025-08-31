import PriceComponent from '@/libs/common/components/PriceComponent';
import { formatSafeDate } from '@/libs/common/utils/date';
import React from 'react';
import { OrderDetail } from '@/libs/orders/types';

export function OrderInfoSummary({ order }: { order: OrderDetail }) {
  return (
    <>
      <div className="bg-content1 grid grid-cols-2 gap-3 rounded-lg p-4 text-sm shadow">
        <span className="text-default-600">Total Amount</span>
        <span>
          <PriceComponent amount={order.totalAmount} />
        </span>
        <span className="text-default-600">Delivery Date</span>
        <span>{formatSafeDate(order.expectedDeliveryDate)}</span>
        <span className="text-default-600">Estimated Delivery</span>
        <span>{formatSafeDate(order.shipment?.expectedDeliveryDate ?? '-')}</span>
      </div>
    </>
  );
}
