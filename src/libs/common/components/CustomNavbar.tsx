import {
  Badge,
  Button,
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@heroui/react';
import Link from 'next/link';

import { useUserState } from '@/libs/users/context/userContext';
import { FaBell, FaChevronLeft, FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { ItemNotification } from '@/libs/orders/components/ItemNotification';

export default function CustomNavbar() {
  const { data } = useUserState();
  const router = useRouter();
  return (
    <Navbar
      classNames={{
        base: 'shadow-sm',
      }}
    >
      <NavbarBrand>
        <Link href="/profile/preferences">
          <FaChevronLeft onClick={() => router.back()} />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Popover>
            <Badge content={3} color="danger">
              <PopoverTrigger>
                <Button isIconOnly radius="full" variant="solid">
                  <FaBell size={15} />
                </Button>
              </PopoverTrigger>
            </Badge>
            <PopoverContent className="w-64">
              <div className="w-full">
                <h3 style={{ fontSize: '1.2em' }} className="pt-2 pb-3 text-center font-semibold">
                  Inbox
                </h3>
                <Divider />
                <div className="my-2 space-y-2">
                  <ItemNotification text="Prepare Shipping" icon={<FaShoppingCart />} />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
