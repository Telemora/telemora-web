import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@heroui/react';

/* eslint-disable @next/next/no-img-element */
interface Props {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  position: 'end' | 'start';
}

export function Carousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      axis: 'x',
      duration: 20,
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    ],
  );
  const banners: Props[] = [
    {
      title: 'Global trading',
      subtitle: 'with crypto-native simplicity',
      imageSrc: '/banners/banner-1.png',
      imageAlt: 'global',
      position: 'start',
    },
    {
      title: 'Telegram login',
      subtitle: 'no extra signups needed',
      imageSrc: '/banners/banner-2.png',
      imageAlt: 'login',
      position: 'end',
    },
    {
      title: 'Sell & Buy anything',
      subtitle: 'goods, services, or digital content',
      imageSrc: '/banners/banner-3.png',
      imageAlt: 'trade',
      position: 'start',
    },
  ];

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {banners.map((item, i) => {
          return (
            <div className="min-w-0 px-2" style={{ flex: '0 0 100%' }} key={i}>
              <CarouselItem {...item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CarouselItem(item: Props) {
  const position = item.position === 'start' ? 'start-3' : 'start-1/2';
  return (
    <div className="min-w-0 px-2" style={{ flex: '0 0 100%' }}>
      <div className="relative">
        <span
          className={cn(
            'absolute top-1/3 max-w-1/2 text-xs font-semibold text-white drop-shadow-lg',
            position,
          )}
        >
          {item.title}
        </span>
        <p
          className={cn(
            'absolute top-1/2 max-w-1/2 text-xs font-semibold text-white drop-shadow-lg',
            position,
          )}
        >
          {item.subtitle}
        </p>
        <img
          src={item.imageSrc}
          className="overflow-clip rounded-lg"
          alt={item.imageAlt}
          width={768}
          height={384}
        />
      </div>
    </div>
  );
}
