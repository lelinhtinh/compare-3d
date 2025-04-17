import { productSchema } from '@/common/schemas';
import { Product, ProductFormProps, UnitEnum } from '@/common/types';
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
import { extractDimensionsFromClipboard } from '@/helpers/extractDimensionsFromClipboard';
import { generateColor } from '@/helpers/generateColor';
import { getExistingNames } from '@/helpers/getExistingNames';
import { sortDimensions } from '@/helpers/sortDimensions';
import { validateDimensions } from '@/helpers/validateDimensions';
import { validateName } from '@/helpers/validateName';
import { zodResolver } from '@hookform/resolvers/zod';
import { Baseline } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Switch } from './ui/switch';

export function ProductForm({
  products,
  setProducts,
  editingProduct,
}: ProductFormProps) {
  const newColor = generateUniqueColor();
  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      idx: '',
      name: '',
      width: null,
      height: null,
      length: null,
      unit: UnitEnum.mm,
      sortable: false,
      color: newColor,
    },
  });

  useEffect(() => {
    form.setFocus('name');
  }, [form]);

  useEffect(() => {
    form.reset(editingProduct || { sortable: form.getValues('sortable') });
  }, [form, editingProduct]);

  function generateUniqueColor() {
    const existingColors = products
      .map((product) => product.color)
      .filter((color): color is string => color !== undefined);
    return generateColor(existingColors);
  }

  function onSubmit(values: Product) {
    if (!validateDimensions(form, values)) return;
    if (!validateName(form, values, getExistingNames(products, values.idx)))
      return;

    if (values.sortable) sortDimensions(values);

    if (values?.idx) {
      updateProduct(values);
    } else {
      addNewProduct(values);
    }

    resetFormAndFocus();
  }

  function resetFormAndFocus() {
    form.reset({
      sortable: form.getValues('sortable'),
      color: generateUniqueColor(),
    });
    setTimeout(() => {
      form.setFocus('name');
    }, 0);
  }

  function updateProduct(values: Product) {
    setProducts((prev) =>
      prev.map((product) =>
        product.idx === values.idx
          ? { ...product, ...values, idx: values.name }
          : product
      )
    );
  }

  function addNewProduct(values: Product) {
    setProducts((prev) => {
      return [...prev, { ...values, idx: values.name }];
    });
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
                step=".001"
                {...field}
                value={field.value ?? ''}
                onChange={(e) =>
                  field.onChange(
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
                onPaste={(e) => {
                  e.preventDefault();
                  const clipboardData = e.clipboardData
                    .getData('text/plain')
                    .toLowerCase()
                    .trim();
                  if (!extractDimensionsFromClipboard(form, clipboardData)) {
                    field.onChange(clipboardData);
                  }
                }}
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
          name="idx"
          render={({ field }) => (
            <FormControl>
              <Input type="hidden" {...field} />
            </FormControl>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input placeholder="Enter a unique name" {...field} />
                </FormControl>
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field: colorField }) => (
                    <FormItem className="mb-0">
                      <FormControl>
                        <label>
                          <input
                            type="color"
                            className="sr-only"
                            name="color"
                            value={colorField.value || newColor}
                            onChange={(e) =>
                              colorField.onChange(e.target.value)
                            }
                            tabIndex={-1}
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="cursor-pointer"
                            style={{ background: colorField.value || newColor }}
                            asChild
                          >
                            <span>
                              <Baseline />
                            </span>
                          </Button>
                        </label>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-4 gap-4 w-full sm:grid-cols-4 mb-0">
          {renderDimensionField('width', 'Width')}
          {renderDimensionField('height', 'Height')}
          {renderDimensionField('length', 'Length')}
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="place-self-end">
                <FormLabel htmlFor="select_unit">Unit</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="select_unit">
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
        <div className="mt-2">
          <p className="text-xs text-muted-foreground">
            Enter a number or paste dimensions in the format: 10x20x30mm
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit">Submit</Button>
          <FormField
            control={form.control}
            name="sortable"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel htmlFor="sort-dimensions" className="mb-0">
                  Sort dimensions
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
