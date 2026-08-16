"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import {
  Wizard,
  clearDraft,
  type WizardStep,
} from "@/components/common/wizard";
import { TextField } from "@/components/common/form-fields/text-field";
import { TextareaField } from "@/components/common/form-fields/textarea-field";
import { SelectField } from "@/components/common/form-fields/select-field";
import { FileUploadField } from "@/components/common/form-fields/file-upload-field";

// Halaman internal untuk preview shell Wizard (stepper + validasi per-step + draft
// localStorage). Bukan bagian dari alur produk — lihat proxy.ts PUBLIC_PATHS.

const DRAFT_KEY = "dev-wizard-demo-draft";

const wizardDemoSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  bio: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  department: z.string().min(1, "Please select a department"),
  avatar: z.any().optional(),
});

type WizardDemoValues = z.infer<typeof wizardDemoSchema>;

const DEPARTMENT_OPTIONS = [
  { value: "engineering", label: "Engineering" },
  { value: "finance", label: "Finance" },
  { value: "hr", label: "Human Resources" },
];

export default function WizardDisplayPage() {
  const [activeStep, setActiveStep] = useState(0);

  const form = useForm<WizardDemoValues>({
    resolver: zodResolver(wizardDemoSchema),
    defaultValues: { fullName: "", bio: "", email: "", department: "" },
  });

  const onSubmit = form.handleSubmit((values) => {
    toast.success("Wizard submitted — check console for values.");
    console.log("wizard-display form values:", values);
    clearDraft(DRAFT_KEY);
  });

  const steps: WizardStep<WizardDemoValues>[] = [
    {
      id: "profile",
      label: "Profile",
      fields: ["fullName"],
      content: (
        <div className="space-y-4">
          <h3 className="text-text-primary text-sm font-medium">Profile</h3>
          <TextField
            control={form.control}
            name="fullName"
            label="Full Name"
            placeholder="Andi Saputra"
          />
          <TextareaField
            control={form.control}
            name="bio"
            label="Bio"
            placeholder="Short bio..."
          />
        </div>
      ),
    },
    {
      id: "contact",
      label: "Contact",
      fields: ["email", "department"],
      content: (
        <div className="space-y-4">
          <h3 className="text-text-primary text-sm font-medium">Contact</h3>
          <TextField
            control={form.control}
            name="email"
            label="Email"
            placeholder="andi@msone.com"
          />
          <SelectField
            control={form.control}
            name="department"
            label="Department"
            placeholder="Choose a department"
            options={DEPARTMENT_OPTIONS}
          />
        </div>
      ),
    },
    {
      id: "attachment",
      label: "Attachment",
      content: (
        <div className="space-y-4">
          <h3 className="text-text-primary text-sm font-medium">Attachment</h3>
          <FileUploadField
            control={form.control}
            name="avatar"
            label="Avatar"
            accept="image/*"
            description="File tidak ikut disimpan ke draft (lihat draftExclude)."
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <PageHeader
        title="Wizard Display"
        description="Preview shell Wizard: stepper, validasi per-step, dan draft localStorage. Halaman internal, tidak masuk navigasi produk."
      />

      <Wizard
        steps={steps}
        form={form}
        activeStep={activeStep}
        onStepChange={setActiveStep}
        onSubmit={onSubmit}
        isSubmitting={form.formState.isSubmitting}
        draftKey={DRAFT_KEY}
        draftExclude={["avatar"]}
      />
    </div>
  );
}
