import type { Control, FieldPath, FieldValues } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"

export interface RadioGroupFieldOption {
  value: string
  label: string
}

interface RadioGroupFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  options: RadioGroupFieldOption[]
  orientation?: "horizontal" | "vertical"
  disabled?: boolean
}

export function RadioGroupField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
  orientation = "horizontal",
  disabled,
}: RadioGroupFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value ?? ""}
              disabled={disabled}
              className={cn(orientation === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col gap-2")}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                  <FormLabel htmlFor={`${name}-${option.value}`} className="font-normal">
                    {option.label}
                  </FormLabel>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
