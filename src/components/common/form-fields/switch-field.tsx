import type { Control, FieldPath, FieldValues } from "react-hook-form"
import { Switch } from "@/components/ui/switch"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

interface SwitchFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  disabled?: boolean
}

export function SwitchField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
}: SwitchFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between gap-2 space-y-0">
          <div className="grid gap-1 leading-none">
            {label && <FormLabel className="font-normal">{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch checked={!!field.value} onCheckedChange={field.onChange} disabled={disabled} />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
