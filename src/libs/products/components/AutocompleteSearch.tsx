'use client';

import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { FaSearch } from 'react-icons/fa';
import { useProductSearch } from '@/libs/products/hooks';

export function AutocompleteSearch() {
  const { products, query, setQuery, isLoading } = useProductSearch();
  return (
    <Autocomplete
      inputValue={query}
      onInputChange={setQuery}
      isLoading={isLoading}
      listboxProps={{
        emptyContent: 'No matching products found',
      }}
      aria-label="search input"
      placeholder="Shoe, Lingrie, Glassess, etc."
      startContent={<FaSearch />}
    >
      {products.map((product) => (
        <AutocompleteItem key={product.id} textValue={product.name}>
          {product.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
