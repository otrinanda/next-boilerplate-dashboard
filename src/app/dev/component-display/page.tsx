"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { PageHeader } from "@/components/common/page-header";
import { TextField } from "@/components/common/form-fields/text-field";
import { TextareaField } from "@/components/common/form-fields/textarea-field";
import { SelectField } from "@/components/common/form-fields/select-field";
import { ComboboxField } from "@/components/common/form-fields/combobox-field";
import { CheckboxField } from "@/components/common/form-fields/checkbox-field";
import { DatePickerField } from "@/components/common/form-fields/date-picker-field";
import { FileUploadField } from "@/components/common/form-fields/file-upload-field";

// Halaman internal untuk preview komponen field yang dipakai bersama di semua form
// modul (mis. Employee create/edit). Bukan bagian dari alur produk — lihat proxy.ts
// PUBLIC_PATHS, halaman ini sengaja dibuat publik seperti /dev/status.

const demoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  bio: z.string().max(200, "Max 200 characters").optional(),
  department: z.string().min(1, "Please select a department"),
  manager: z.string().min(1, "Please choose a manager"),
  joinDate: z.date({ error: "Join date is required" }),
  isActive: z.boolean(),
  attachment: z.any().optional(),
});

type DemoValues = z.infer<typeof demoSchema>;

const DEPARTMENT_OPTIONS = [
  { value: "engineering", label: "Engineering" },
  { value: "finance", label: "Finance" },
  { value: "hr", label: "Human Resources" },
  { value: "sales", label: "Sales" },
];

const MANAGER_OPTIONS = [
  { value: "andi", label: "Andi Saputra" },
  { value: "citra", label: "Citra Dewi" },
  { value: "gilang", label: "Gilang Ramadhan" },
];

export default function ComponentDisplayPage() {
  const form = useForm<DemoValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      name: "",
      bio: "",
      department: "",
      manager: "",
      isActive: false,
    },
  });

  const onSubmit = (values: DemoValues) => {
    toast.success("Form submitted — check console for values.");
    console.log("component-display form values:", values);
  };

  return (
    <div className="p-4 space-y-6">
      <PageHeader
        title="Component Display"
        description="Preview komponen field bersama (form-fields) yang dipakai di seluruh modul. Halaman internal, tidak masuk navigasi produk."
      />

      <Card className="bg-surface-raised border-border max-w-2xl">
        <CardHeader>
          <CardTitle className="text-text-primary text-sm font-medium">
            Form Fields
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TextField
                control={form.control}
                name="name"
                label="Text Field"
                placeholder="e.g. Andi Saputra"
                description="Input teks biasa — dipakai untuk nama, email, NIK, dll."
              />

              <TextareaField
                control={form.control}
                name="bio"
                label="Textarea Field"
                placeholder="Short bio..."
                description="Input multi-baris — dipakai untuk deskripsi/catatan panjang."
              />

              <SelectField
                control={form.control}
                name="department"
                label="Select Field (Dropdown)"
                placeholder="Choose a department"
                options={DEPARTMENT_OPTIONS}
                description="Dropdown pilihan tertutup — cocok untuk daftar pendek yang sudah pasti."
              />

              <ComboboxField
                control={form.control}
                name="manager"
                label="Combobox Field"
                placeholder="Choose a manager"
                searchPlaceholder="Search manager..."
                options={MANAGER_OPTIONS}
                description="Dropdown dengan search — cocok untuk daftar panjang (mis. pilih karyawan)."
              />

              <DatePickerField
                control={form.control}
                name="joinDate"
                label="Date Picker Field"
                placeholder="Pick join date"
                description="Kalender popover — dipakai untuk semua input tanggal."
              />

              <CheckboxField
                control={form.control}
                name="isActive"
                label="Checkbox Field"
                description="Toggle boolean sederhana — dipakai untuk status/consent."
              />

              <FileUploadField
                control={form.control}
                name="attachment"
                label="File Upload Field"
                accept="image/*,application/pdf"
                description="Klik atau drag & drop — dipakai untuk foto karyawan, dokumen pendukung, dll."
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
