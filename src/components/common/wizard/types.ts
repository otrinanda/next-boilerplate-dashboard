import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form"

export type StepStatus = "upcoming" | "current" | "completed"

export interface WizardStep<TFieldValues extends FieldValues> {
  id: string
  label: string
  /** Field paths validated (via form.trigger) before advancing past this step. Omit if the step has nothing to validate. */
  fields?: FieldPath<TFieldValues>[]
  /** Consumer-built content, already wired to the shared form's control. */
  content: React.ReactNode
  /** Reserved for future CRUD-list steps (e.g. Family/Experience) where "0 items" is a valid complete state. Unused for now. */
  optional?: boolean
}

export interface WizardProps<TFieldValues extends FieldValues> {
  steps: WizardStep<TFieldValues>[]
  /**
   * The whole react-hook-form return value, not just `control` — unlike every
   * `common/form-fields/*` component. The Wizard needs `trigger()` and
   * `getFieldState()` for per-step validation, which `control` alone doesn't expose.
   */
  form: UseFormReturn<TFieldValues>
  activeStep: number
  onStepChange: (index: number) => void
  /** Called instead of advancing once the user confirms on the last step. */
  onSubmit: () => void
  isSubmitting?: boolean
  /** "completed-only" (default): jump back freely, jump forward only into already-completed steps. "none": fully linear, no step-circle clicks. */
  allowStepClick?: "completed-only" | "none"
  /** "stepper" (default): numbered circles. "tabs": underlined tab strip — same click/gating rules, different look. */
  navigationStyle?: "stepper" | "tabs"
  className?: string
  /** Provide to enable localStorage auto-save/restore. Omit to disable draft persistence entirely. */
  draftKey?: string
  /** Field paths to omit from the persisted draft (e.g. File-valued fields, which can't survive JSON.stringify). */
  draftExclude?: FieldPath<TFieldValues>[]
  previousLabel?: string
  nextLabel?: string
  submitLabel?: string
}

export interface WizardStepperStep {
  id: string
  label: string
}

export interface WizardStepperProps {
  steps: WizardStepperStep[]
  activeStep: number
  getStatus: (index: number) => StepStatus
  onStepClick?: (index: number) => void
}

export interface WizardFooterProps {
  isFirstStep: boolean
  isLastStep: boolean
  isSubmitting?: boolean
  onPrevious: () => void
  onNext: () => void
  previousLabel?: string
  nextLabel?: string
  submitLabel?: string
}
