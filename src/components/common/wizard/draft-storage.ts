interface DraftPayload<T> {
  activeStep: number
  visited: number[]
  values: T
  savedAt: string
}

interface TaggedDate {
  __type: "date"
  value: string
}

function isTaggedDate(value: unknown): value is TaggedDate {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as Record<string, unknown>).__type === "date" &&
    typeof (value as Record<string, unknown>).value === "string"
  )
}

function dateReplacer(_key: string, value: unknown): unknown {
  return value instanceof Date ? ({ __type: "date", value: value.toISOString() } satisfies TaggedDate) : value
}

function dateReviver(_key: string, value: unknown): unknown {
  return isTaggedDate(value) ? new Date(value.value) : value
}

/**
 * Best-effort localStorage draft persistence. Never throws — private-mode/quota
 * issues just silently no-op, since draft-saving must never block the actual form.
 */
export function saveDraft<T>(key: string, activeStep: number, visited: number[], values: T): void {
  try {
    const payload: DraftPayload<T> = { activeStep, visited, values, savedAt: new Date().toISOString() }
    localStorage.setItem(key, JSON.stringify(payload, dateReplacer))
  } catch {
    // ignore — draft persistence is best-effort only
  }
}

export function loadDraft<T>(key: string): DraftPayload<T> | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw, dateReviver) as DraftPayload<T>
  } catch {
    return null
  }
}

export function clearDraft(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}
