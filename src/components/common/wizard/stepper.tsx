import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StepStatus, WizardStepperProps } from "@/components/common/wizard/types"

const STEP_CIRCLE_CLASSES: Record<StepStatus, string> = {
  upcoming: "border-border bg-surface text-text-muted",
  current: "border-primary bg-primary text-primary-foreground",
  completed: "border-status-success bg-status-success/10 text-status-success",
}

export function WizardStepper({ steps, activeStep, getStatus, onStepClick }: WizardStepperProps) {
  return (
    <div className="flex items-center overflow-x-auto pb-2">
      {steps.map((step, index) => {
        const status = getStatus(index)
        const isClickable = !!onStepClick && (index <= activeStep || status === "completed")
        const lineFilled = status === "completed"

        return (
          <div key={step.id} className="flex flex-1 items-center last:flex-initial">
            <button
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick?.(index)}
              className={cn(
                "flex shrink-0 flex-col items-center gap-1.5",
                isClickable ? "cursor-pointer" : "cursor-default"
              )}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                  STEP_CIRCLE_CLASSES[status]
                )}
              >
                {status === "completed" ? <CheckIcon className="size-4" /> : index + 1}
              </span>
              <span
                className={cn(
                  "text-2xs whitespace-nowrap",
                  status === "current" ? "text-text-primary font-medium" : "text-text-secondary"
                )}
              >
                {step.label}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div className={cn("mx-2 h-px flex-1", lineFilled ? "bg-status-success" : "bg-border-subtle")} />
            )}
          </div>
        )
      })}
    </div>
  )
}
