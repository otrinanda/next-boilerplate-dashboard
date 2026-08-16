import { ArrowRightIcon, SaveIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WizardFooterProps } from "@/components/common/wizard/types"

export function WizardFooter({
  isFirstStep,
  isLastStep,
  isSubmitting,
  onPrevious,
  onNext,
  previousLabel = "Sebelumnya",
  nextLabel = "Selanjutnya",
  submitLabel = "Simpan Data",
}: WizardFooterProps) {
  return (
    <div className="flex items-center justify-end gap-2 pt-4">
      {!isFirstStep && (
        <Button variant="outline" size="sm" disabled={isSubmitting} onClick={onPrevious}>
          {previousLabel}
        </Button>
      )}
      <Button size="sm" disabled={isSubmitting} onClick={onNext}>
        {isLastStep ? submitLabel : nextLabel}
        {isLastStep ? <SaveIcon className="size-4" /> : <ArrowRightIcon className="size-4" />}
      </Button>
    </div>
  )
}
