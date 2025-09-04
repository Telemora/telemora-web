import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { FaSearch } from 'react-icons/fa';

export function AutocompleteSearch() {
  return (
    <Autocomplete placeholder="Shoe, Lingrie, Glassess, etc." startContent={<FaSearch />}>
      <AutocompleteItem>Lingerie</AutocompleteItem>
    </Autocomplete>
  );
}
