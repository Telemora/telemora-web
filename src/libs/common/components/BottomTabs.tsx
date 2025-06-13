'use client';

import { Tab, Tabs } from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';
import { FaClipboard, FaHome, FaStore, FaUser } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

const TAB_KEYS = {
  MARKET: '/market',
  STORES: '/stores',
  ORDERS: '/orders',
  PROFILE: '/profile',
};

function getBaseTabKey(pathname: string): string | null {
  if (pathname.startsWith(TAB_KEYS.MARKET)) return TAB_KEYS.MARKET;
  if (pathname.startsWith(TAB_KEYS.STORES)) return TAB_KEYS.STORES;
  if (pathname.startsWith(TAB_KEYS.ORDERS)) return TAB_KEYS.ORDERS;
  if (pathname.startsWith(TAB_KEYS.PROFILE)) return TAB_KEYS.PROFILE;
  return null;
}

export default function BottomTabs() {
  const pathname = usePathname();
  const route = useRouter();
  const t = useTranslations('tabs');

  const resolvedTabKey = getBaseTabKey(pathname);

  const tabList = [
    {
      key: TAB_KEYS.MARKET,
      label: t('market'),
      icon: <FaHome size={15} aria-label={t('market')} />,
    },
    {
      key: TAB_KEYS.STORES,
      label: t('stores'),
      icon: <FaStore size={15} aria-label={t('stores')} />,
    },
    {
      key: TAB_KEYS.ORDERS,
      label: t('orders'),
      icon: <FaClipboard size={15} aria-label={t('orders')} />,
    },
    {
      key: TAB_KEYS.PROFILE,
      label: t('profile'),
      icon: <FaUser size={15} aria-label={t('profile')} />,
    },
  ];

  return (
    <Tabs
      aria-label="Bottom Navigation"
      selectedKey={resolvedTabKey}
      size="lg"
      fullWidth
      placement="bottom"
      items={tabList}
      classNames={{
        tabWrapper: 'px-4 mb-6 fixed bottom-0 z-50 w-full',
        base: 'backdrop-blur-sm',
        tabList: '',
        tab: 'h-16',
        cursor: 'bg-default-200 text-primary',
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
