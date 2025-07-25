import { Button, Input } from '@heroui/react';
import {
  ArrayPath,
  FieldArray,
  FieldArrayWithId,
  Path,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa6';

interface ProductAttributeFieldsProps<TFieldValues extends Record<string, unknown>> {
  fields: FieldArrayWithId<TFieldValues, ArrayPath<TFieldValues>, 'id'>[];
  register: UseFormRegister<TFieldValues>;
  append: UseFieldArrayAppend<TFieldValues, ArrayPath<TFieldValues>>;
  remove: UseFieldArrayRemove;
  name: Path<TFieldValues>;
}

export function ProductAttributeFields<TFieldValues extends Record<string, unknown>>({
  fields,
  register,
  append,
  remove,
  name,
}: ProductAttributeFieldsProps<TFieldValues>) {
  return (
    <section>
      <h2 className="mb-2 font-semibold">Attributes</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 flex items-center gap-2">
          <Input {...register(`${name}.${index}.name` as Path<TFieldValues>)} placeholder="Name" />
          <Input
            {...register(`${name}.${index}.value` as Path<TFieldValues>)}
            placeholder="Value"
          />
          <Button variant="light" size="sm" onPress={() => remove(index)}>
            <FaTrash />
          </Button>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        startContent={<FaPlus />}
        onPress={() =>
          append({
            name: '',
            value: '',
          } as FieldArray<TFieldValues, ArrayPath<TFieldValues>>)
        }
      >
        Add Attribute
      </Button>
    </section>
  );
}
