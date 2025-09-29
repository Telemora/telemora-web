export const queryKeys = {
  orders: {
    all: ['orders'] as const,
    detail: (id: string) => ['orders', id] as const,
  },
  stores: {
    all: ['stores'] as const,
    my: ['stores', 'my'] as const,
    detail: (id: string) => ['stores', id] as const,
    discover: ['stores', 'discover'] as const,
    featured: ['stores', 'featured'] as const,
  },
  products: {
    all: ['products'] as const,
    detail: (storeId: string, productId: string) => ['products', storeId, productId] as const,
    byStore: (storeId: string) => ['products', 'store', storeId] as const,
  },
  discounts: {
    all: ['discounts'] as const,
    detail: (id: string, discountId: string) => ['discounts', id, discountId] as const,
    byStore: (storeId: string) => ['discounts', 'store', storeId] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    detail: (id: string) => ['reviews', 'detail', id] as const,
    byProduct: (productId: string) => ['reviews', 'product', productId] as const,
  },
  location: {
    countries: ['countries'] as const,
    statesByCountry: (countryId: string) => ['states', countryId] as const,
    citiesByState: (stateId: string) => ['cities', stateId] as const,
    nearest: (lat: number, lng: number) => ['nearest-location', lat, lng] as const,
  },
};
