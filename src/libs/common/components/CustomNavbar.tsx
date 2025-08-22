import { Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import Link from 'next/link';

import { useUserState } from '@/libs/users/context/userContext';
import { FaChevronLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CustomNavbar() {
  const { data } = useUserState();
  const router = useRouter();
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/profile/preferences">
          <FaChevronLeft onClick={() => router.back()} />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/profile">
            <Avatar size="sm" src={data?.photo?.url || '/default-profile.png'} />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
