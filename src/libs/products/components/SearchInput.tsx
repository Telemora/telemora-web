import { Form, Input } from '@heroui/react';
import { FaSearch } from 'react-icons/fa';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
}

export function SearchInput({ query, setQuery }: SearchInputProps) {
  return (
    <Form>
      <Input value={query} onValueChange={setQuery} startContent={<FaSearch />} isClearable />
    </Form>
  );
}
