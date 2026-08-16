import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { WizardStepperProps } from "@/components/common/wizard/types"

/** Tab-style alternative to `WizardStepper` — same step/status/click contract,
 * just rendered as an underlined tab strip instead of numbered circles. */
export function WizardTabs({ steps, activeStep, getStatus, onStepClick }: WizardStepperProps) {
  return (
    <Tabs value={String(activeStep)} onValueChange={(value) => onStepClick?.(Number(value))}>
      <TabsList variant="line" className="h-auto w-full justify-start gap-4 p-0">
        {steps.map((step, index) => {
          const status = getStatus(index)
          const isClickable = !!onStepClick && (index <= activeStep || status === "completed")

          return (
            <TabsTrigger
              key={step.id}
              value={String(index)}
              disabled={!isClickable}
              className="flex-none rounded-none px-1 py-2 text-sm font-medium text-text-muted data-active:font-semibold data-active:text-primary data-active:shadow-none after:h-0.5 after:bg-primary"
            >
              {step.label}
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}
