import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { FaPen } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { UserPrivateProfile } from '@/libs/users/types';

export default function UserProfileCard({ user }: { user: UserPrivateProfile }) {
  const firstName = user.firstName;
  const lastName = user.lastName;
  const displayName = `${firstName} ${lastName}`;

  return (
    <section
      aria-labelledby="profile-heading"
      role="region"
      className="mx-auto w-full max-w-sm space-y-2 sm:space-y-4"
    >
      <div className="text-center">
        <figure className="mx-auto">
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full sm:h-32 sm:w-32">
            <Image
              key={user.photo?.url}
              src={user.photo?.url || '/default-profile.png'}
              alt={`Photo of ${displayName}`}
              width={128}
              height={128}
              className="aspect-square object-cover"
              priority
            />
          </div>
          <figcaption className="mt-3 sm:mt-4">
            <h2 id="profile-heading" className="text-base font-semibold sm:text-lg">
              {displayName}
            </h2>
            {user.username && (
              <p className="text-default-500 text-xs sm:text-sm">
                <span className="sr-only">Username: </span>@{user.username}
              </p>
            )}
          </figcaption>
        </figure>
      </div>
      <nav className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-4">
        <Link href="/profile/edit">
          <Button
            fullWidth
            size="sm"
            color="secondary"
            variant="solid"
            className="flex items-center justify-center gap-2"
          >
            <FaPen className="text-xs sm:text-sm" aria-hidden="true" />
            <span>Edit Profile</span>
          </Button>
        </Link>
        <Link href="/profile/preferences">
          <Button
            fullWidth
            size="sm"
            color="secondary"
            variant="solid"
            className="flex items-center justify-center gap-2"
          >
            <FaGear className="text-xs sm:text-sm" aria-hidden="true" />
            <span>Preferences</span>
          </Button>
        </Link>
      </nav>
    </section>
  );
}
