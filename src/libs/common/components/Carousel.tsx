import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

{
  /* eslint-disable @next/next/no-img-element */
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

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        <div className="min-w-0 px-2" style={{ flex: '0 0 100%' }}>
          <div className="relative">
            <span className="text-default-50 absolute start-3 top-1/3 font-semibold drop-shadow-sm">
              Global trading
            </span>
            <p className="text-default-50 absolute start-3 top-1/2 max-w-1/2 text-xs drop-shadow-lg">
              with crypto-native simplicity
            </p>
            <img
              src="/banners/banner-1.png"
              className="overflow-clip rounded-lg"
              alt="banner-1"
              width={768}
              height={384}
            />
          </div>
        </div>
        <div className="min-w-0 px-2" style={{ flex: '0 0 100%' }}>
          <div className="relative">
            <span className="text-default-50 absolute start-2/5 top-1/3 font-semibold drop-shadow-sm">
              Telegram login
            </span>
            <p className="text-default-50 absolute start-2/5 top-1/2 max-w-1/2 text-xs drop-shadow-lg">
              no extra signups needed
            </p>
            <img
              src="/banners/banner-2.png"
              className="overflow-clip rounded-lg"
              alt="banner-1"
              width={768}
              height={384}
            />
          </div>
        </div>
        <div className="min-w-0 px-2" style={{ flex: '0 0 100%' }}>
          <div className="relative">
            <span className="text-default-50 absolute start-3 top-1/3 font-semibold drop-shadow-sm">
              Sell anything
            </span>
            <p className="text-default-50 absolute start-3 top-1/2 max-w-1/2 text-xs drop-shadow-lg">
              goods, services, or digital content
            </p>
            <img
              src="/banners/banner-3.png"
              className="overflow-clip rounded-lg"
              alt="banner-1"
              width={768}
              height={384}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
