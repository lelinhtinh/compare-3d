import { generateDarkColor, validateDimensions } from '@/common/helpers';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { productSchema } from '@/schemas';
import { Product, ProductFormProps, UnitEnum } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Switch } from './ui/switch';

export function ProductForm({ products, setProducts }: ProductFormProps) {
  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      width: null,
      height: null,
      length: null,
      unit: UnitEnum.mm,
      sortable: false,
    },
  });

  function onSubmit(values: Product) {
    const existingNames = products.map((product) => product.name) || [];

    if (!validateDimensions(form, values)) return;

    if (existingNames.includes(values.name)) {
      form.setError('name', {
        type: 'manual',
        message: 'Product name must be unique',
      });
      return;
    }

    if (values.sortable) {
      const dimensions = [values.width!, values.height!, values.length!].sort(
        (a, b) => a - b
      );
      [values.width, values.height, values.length] = dimensions;
    }

    setProducts((prev) => {
      const existingColors = prev
        .map((product) => product.color)
        .filter((color): color is string => color !== undefined);

      const newColor = generateDarkColor(existingColors);

      return [...prev, { ...values, color: newColor }];
    });

    form.reset({ sortable: form.getValues('sortable') });
  }

  function renderDimensionField(
    name: 'width' | 'height' | 'length',
    label: string
  ) {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={label}
                type="number"
                {...field}
                value={field.value ?? ''}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter a unique name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-4 w-full sm:grid-cols-4">
          {renderDimensionField('width', 'Width')}
          {renderDimensionField('height', 'Height')}
          {renderDimensionField('length', 'Length')}
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="place-self-end">
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(UnitEnum).map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit">Submit</Button>
          <FormField
            control={form.control}
            name="sortable"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel htmlFor="sort-dimensions" className="mb-0">
                  Sort Dimensions
                </FormLabel>
                <FormControl>
                  <Switch
                    id="sort-dimensions"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
