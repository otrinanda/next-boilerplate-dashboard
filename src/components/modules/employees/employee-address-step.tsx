import type { Control, UseFormWatch } from "react-hook-form"
import { Separator } from "@/components/ui/separator"
import { TextField } from "@/components/common/form-fields/text-field"
import { TextareaField } from "@/components/common/form-fields/textarea-field"
import { SelectField } from "@/components/common/form-fields/select-field"
import { SwitchField } from "@/components/common/form-fields/switch-field"
import {
  CITY_OPTIONS,
  PROVINCE_OPTIONS,
  type EmployeeFormValues,
} from "@/components/modules/employees/employee-form.schema"

export function EmployeeAddressStep({
  control,
  watch,
}: {
  control: Control<EmployeeFormValues>
  watch: UseFormWatch<EmployeeFormValues>
}) {
  const sameAsCurrentAddress = watch("sameAsCurrentAddress")

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-text-primary text-sm font-medium">Contact Numbers</h3>
          <Separator className="mt-2" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            control={control}
            name="mobileNumber"
            label="Mobile Number"
            type="tel"
            placeholder="Enter Mobile Number"
          />
          <TextField
            control={control}
            name="homePhone"
            label="Home Phone (Optional)"
            type="tel"
            placeholder="Enter Home Phone"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-text-primary text-sm font-medium">Current Address</h3>
          <Separator className="mt-2" />
        </div>
        <TextareaField
          control={control}
          name="currentAddress.street"
          label="Street Address"
          placeholder="Enter street address details, building, floor, etc."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SelectField
            control={control}
            name="currentAddress.city"
            label="City"
            placeholder="Choose city"
            options={CITY_OPTIONS}
          />
          <SelectField
            control={control}
            name="currentAddress.province"
            label="Province"
            placeholder="Choose Province"
            options={PROVINCE_OPTIONS}
          />
          <TextField
            control={control}
            name="currentAddress.postalCode"
            label="Postal Code"
            placeholder="Enter Postal Code"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-text-primary text-sm font-medium">Permanent Address</h3>
          <SwitchField control={control} name="sameAsCurrentAddress" label="Same as current address" />
        </div>
        <Separator />
        {!sameAsCurrentAddress && (
          <>
            <TextareaField
              control={control}
              name="permanentAddress.street"
              label="Street Address"
              placeholder="Enter street address details, building, floor, etc."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <SelectField
                control={control}
                name="permanentAddress.city"
                label="City"
                placeholder="Choose city"
                options={CITY_OPTIONS}
              />
              <SelectField
                control={control}
                name="permanentAddress.province"
                label="Province"
                placeholder="Choose Province"
                options={PROVINCE_OPTIONS}
              />
              <TextField
                control={control}
                name="permanentAddress.postalCode"
                label="Postal Code"
                placeholder="Enter Postal Code"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
