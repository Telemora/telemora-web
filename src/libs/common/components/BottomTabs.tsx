'use client';

import { Tab, Tabs } from '@heroui/tabs';
import { usePathname, useRouter } from 'next/navigation';
import { FaClipboard, FaShoppingCart, FaStore, FaUser } from 'react-icons/fa';

const TAB_KEYS = {
  MARKET: '/',
  STORES: '/stores',
  ORDERS: '/orders',
  PROFILE: '/profile',
};

function getBaseTabKey(pathname: string): string | null {
  if (pathname === TAB_KEYS.MARKET) return TAB_KEYS.MARKET;
  if (pathname.startsWith(TAB_KEYS.STORES)) return TAB_KEYS.STORES;
  if (pathname.startsWith(TAB_KEYS.ORDERS)) return TAB_KEYS.ORDERS;
  if (pathname.startsWith(TAB_KEYS.PROFILE)) return TAB_KEYS.PROFILE;
  return null;
}

const tabList = [
  { key: TAB_KEYS.MARKET, label: 'Market', icon: <FaShoppingCart size={15} aria-label="Market" /> },
  { key: TAB_KEYS.STORES, label: 'Stores', icon: <FaStore size={15} aria-label="Stores" /> },
  { key: TAB_KEYS.ORDERS, label: 'Orders', icon: <FaClipboard size={15} aria-label="Orders" /> },
  { key: TAB_KEYS.PROFILE, label: 'Profile', icon: <FaUser size={15} aria-label="Profile" /> },
];

export function BottomTabs() {
  const pathname = usePathname();
  const route = useRouter();
  const resolvedTabKey = getBaseTabKey(pathname);

  return (
    <Tabs
      aria-label="Bottom Navigation"
      selectedKey={resolvedTabKey}
      size="lg"
      fullWidth
      placement="bottom"
      items={tabList}
      color="primary"
      radius="full"
      classNames={{
        base: 'fixed bottom-6 z-50 bg-default-100/10 backdrop-blur-lg bg-transparent max-w-xs translate-x-1/2 right-1/2',
        tabList: 'max-w-xs mx-auto',
        tab: 'h-16',
      }}
      style={{
        paddingBottom: 'var(--tg-safe-area-inset-bottom)',
      }}
      onSelectionChange={(key) => route.push(key as string)}
    >
      {({ key, label, icon }) => (
        <Tab
          key={key}
          title={
            <div className="flex flex-col items-center gap-1 text-sm">
              {icon} <span>{label}</span>
            </div>
          }
        />
      )}
    </Tabs>
  );
}
