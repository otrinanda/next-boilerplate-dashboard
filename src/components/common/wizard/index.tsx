"use client"

import * as React from "react"
import type { FieldValues } from "react-hook-form"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { WizardStepper } from "@/components/common/wizard/stepper"
import { WizardTabs } from "@/components/common/wizard/wizard-tabs"
import { WizardFooter } from "@/components/common/wizard/footer"
import { saveDraft, loadDraft } from "@/components/common/wizard/draft-storage"
import type { StepStatus, WizardProps } from "@/components/common/wizard/types"

export type { WizardStep, WizardProps, StepStatus } from "@/components/common/wizard/types"
export { saveDraft, loadDraft, clearDraft } from "@/components/common/wizard/draft-storage"

function omitPaths<T>(values: T, paths?: string[]): T {
  if (!paths || paths.length === 0) return values
  const clone = structuredCloneShallow(values)
  for (const path of paths) {
    const keys = path.split(".")
    let obj: Record<string, unknown> = clone as Record<string, unknown>
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (obj[key] == null || typeof obj[key] !== "object") break
      obj[key] = Array.isArray(obj[key]) ? [...(obj[key] as unknown[])] : { ...(obj[key] as Record<string, unknown>) }
      obj = obj[key] as Record<string, unknown>
    }
    delete obj[keys[keys.length - 1]]
  }
  return clone
}

function structuredCloneShallow<T>(value: T): T {
  if (Array.isArray(value)) return [...value] as T
  if (value && typeof value === "object") return { ...value } as T
  return value
}

// Wizard takes the whole react-hook-form `form` object (not just `control`, unlike
// every common/form-fields/* component) because it needs form.trigger() and
// form.getFieldState() for per-step validation — control alone doesn't expose these.
export function Wizard<TFieldValues extends FieldValues>({
  steps,
  form,
  activeStep,
  onStepChange,
  onSubmit,
  isSubmitting,
  allowStepClick = "completed-only",
  navigationStyle = "stepper",
  className,
  draftKey,
  draftExclude,
  previousLabel,
  nextLabel,
  submitLabel,
}: WizardProps<TFieldValues>) {
  const [visited, setVisited] = React.useState<Set<number>>(() => new Set([0]))
  const activeStepRef = React.useRef(activeStep)
  const visitedRef = React.useRef(visited)
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    activeStepRef.current = activeStep
  }, [activeStep])

  React.useEffect(() => {
    visitedRef.current = visited
  }, [visited])

  // Restore a draft once, on mount only — intentionally empty deps.
  React.useEffect(() => {
    if (!draftKey) return
    const draft = loadDraft<TFieldValues>(draftKey)
    if (draft && typeof draft.activeStep === "number") {
      const restoredVisited = Array.isArray(draft.visited) ? draft.visited : []
      form.reset(draft.values)
      onStepChange(draft.activeStep)
      setVisited(new Set([...restoredVisited, draft.activeStep]))
      toast.info("Draft dipulihkan dari sesi sebelumnya.")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (!draftKey) return
    const subscription = form.watch((values) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        saveDraft(draftKey, activeStepRef.current, Array.from(visitedRef.current), omitPaths(values, draftExclude))
      }, 800)
    })
    return () => {
      subscription.unsubscribe()
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey])

  React.useEffect(() => {
    if (!draftKey) return
    saveDraft(draftKey, activeStep, Array.from(visited), omitPaths(form.getValues(), draftExclude))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey, activeStep, visited])

  const getStatus = React.useCallback(
    (index: number): StepStatus => {
      if (index === activeStep) return "current"
      if (!visited.has(index)) return "upcoming"
      const fields = steps[index]?.fields
      const hasErrors = fields?.some((name) => form.getFieldState(name, form.formState).invalid)
      return hasErrors ? "upcoming" : "completed"
    },
    [activeStep, visited, steps, form]
  )

  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === steps.length - 1

  const handleNext = async () => {
    const step = steps[activeStep]
    if (step.fields?.length) {
      const valid = await form.trigger(step.fields)
      if (!valid) return
    }
    setVisited((prev) => new Set([...prev, activeStep]))
    if (isLastStep) {
      onSubmit()
    } else {
      onStepChange(activeStep + 1)
    }
  }

  const handleStepClick = (index: number) => {
    if (allowStepClick === "none") return
    if (index <= activeStep || getStatus(index) === "completed") {
      onStepChange(index)
    }
  }

  return (
    <Form {...form}>
      <div className={cn("space-y-6", className)}>
        {navigationStyle === "tabs" ? (
          <WizardTabs
            steps={steps.map((step) => ({ id: step.id, label: step.label }))}
            activeStep={activeStep}
            getStatus={getStatus}
            onStepClick={allowStepClick === "none" ? undefined : handleStepClick}
          />
        ) : (
          <WizardStepper
            steps={steps.map((step) => ({ id: step.id, label: step.label }))}
            activeStep={activeStep}
            getStatus={getStatus}
            onStepClick={allowStepClick === "none" ? undefined : handleStepClick}
          />
        )}
        <Card className="bg-surface-raised border-border">
          <CardContent>{steps[activeStep].content}</CardContent>
        </Card>
        <WizardFooter
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isSubmitting={isSubmitting}
          onPrevious={() => onStepChange(activeStep - 1)}
          onNext={handleNext}
          previousLabel={previousLabel}
          nextLabel={nextLabel}
          submitLabel={submitLabel}
        />
      </div>
    </Form>
  )
}
