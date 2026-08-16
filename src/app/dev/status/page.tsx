"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2,
  Circle,
  Loader,
  ArrowRight,
  Layers,
  Database,
  Settings2,
  Clock,
  Cpu,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

// ─── Types ───────────────────────────────────────────────────────────────────

type PhaseStatus = "done" | "active" | "upcoming";

interface PhaseItem {
  label: string;
  done: boolean;
}

interface Phase {
  id: number;
  name: string;
  description: string;
  status: PhaseStatus;
  progress: number;
  icon: React.ElementType;
  items: PhaseItem[];
}

interface DesignToken {
  name: string;
  cssVar: string;
  hex: string;
  label: string;
}

interface LibVersion {
  pkg: string;
  version: string;
  role: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PHASES: Phase[] = [
  {
    id: 1,
    name: "Foundation",
    description: "Setup, design system, auth, layout shell, common components",
    status: "active",
    progress: 95,
    icon: Layers,
    items: [
      { label: "Project setup Next.js 16 + Tailwind v4", done: true },
      { label: "package.json versi pinned", done: true },
      { label: "postcss.config.mjs", done: true },
      { label: "globals.css @theme design tokens", done: true },
      { label: "shadcn/ui init", done: true },
      { label: "Restrukturisasi ke src/ + route group (dashboard)/(auth)", done: true },
      { label: "Types & constants (api, employee, roles, routes, navigation)", done: true },
      { label: "Axios client + interceptors (401/403/500/503)", done: true },
      { label: "TanStack Query client + query keys", done: true },
      { label: "Zustand stores (auth, payroll, error)", done: true },
      { label: "Permission matrix + route guards (canAccess, ROUTE_PERMISSIONS)", done: true },
      { label: "Proxy JWT decode + route guard (+ dev bypass)", done: true },
      { label: "use-permissions hook", done: true },
      { label: "use-auth hook (login/logout)", done: true },
      { label: "AppSidebar role-aware nav (via canAccess)", done: true },
      { label: "AppTopbar user menu + logout", done: true },
      { label: "StatusBadge", done: true },
      { label: "PageHeader", done: true },
      { label: "ConfirmDialog", done: true },
      { label: "ErrorState", done: true },
      { label: "FatalErrorBoundary", done: true },
      { label: "Shared DataTable (common/data-table, sorting/filtering/pagination/row actions)", done: true },
      { label: "Form field components (Text, Textarea, Select, Combobox, Checkbox, DatePicker, FileUpload)", done: true },
      { label: "Wizard shell (stepper, per-step validation, draft autosave/restore)", done: true },
      { label: "Login page + LoginForm (RHF + Zod) — menunggu kontrak BE", done: false },
    ],
  },
  {
    id: 2,
    name: "Master Data",
    description: "Employee, organisasi, struktur gaji",
    status: "active",
    progress: 33,
    icon: Database,
    items: [
      { label: "Employee list page + table (data mock, menunggu BE)", done: true },
      { label: "Deactivate employee flow (row action + ConfirmDialog)", done: true },
      { label: "Employee create/edit form (field components & Wizard siap, form belum dibangun)", done: false },
      { label: "Employee detail page", done: false },
      { label: "Organisasi (divisi, jabatan, lokasi)", done: false },
      { label: "Struktur gaji dasar", done: false },
    ],
  },
  {
    id: 3,
    name: "Konfigurasi",
    description: "Komponen payroll, pajak PTKP/tarif, BPJS",
    status: "upcoming",
    progress: 0,
    icon: Settings2,
    items: [
      { label: "Komponen payroll (tunjangan, potongan)", done: false },
      { label: "Konfigurasi PTKP", done: false },
      { label: "Konfigurasi tarif pajak PPh 21", done: false },
      { label: "Konfigurasi BPJS Kesehatan & TK", done: false },
    ],
  },
  {
    id: 4,
    name: "Operasional",
    description: "Kehadiran, lembur, pinjaman karyawan",
    status: "upcoming",
    progress: 0,
    icon: Clock,
    items: [
      { label: "Import & manajemen kehadiran", done: false },
      { label: "Pengajuan & approval lembur", done: false },
      { label: "Manajemen pinjaman + cicilan", done: false },
    ],
  },
  {
    id: 5,
    name: "Payroll Engine",
    description: "Run payroll, review, approval, lock",
    status: "upcoming",
    progress: 0,
    icon: Cpu,
    items: [
      { label: "Jalankan payroll (kalkulasi otomatis)", done: false },
      { label: "Review & penyesuaian manual", done: false },
      { label: "Alur approval multi-level", done: false },
      { label: "Lock & rollback payroll", done: false },
    ],
  },
  {
    id: 6,
    name: "Laporan & Payslip",
    description: "THR, pajak, rekonsiliasi, slip gaji PDF",
    status: "upcoming",
    progress: 0,
    icon: FileText,
    items: [
      { label: "Laporan payroll bulanan", done: false },
      { label: "Laporan & rekonsiliasi pajak PPh 21", done: false },
      { label: "Proses THR", done: false },
      { label: "Generate & kirim slip gaji PDF", done: false },
    ],
  },
];

const DESIGN_TOKENS: DesignToken[] = [
  { name: "primary",        cssVar: "--color-primary",        hex: "#2E74C0", label: "Biru utama" },
  { name: "primary-light",  cssVar: "--color-primary-light",  hex: "#60A5FA", label: "Biru muda" },
  { name: "surface",        cssVar: "--color-surface",        hex: "#13171E", label: "Background" },
  { name: "surface-raised", cssVar: "--color-surface-raised", hex: "#0D1117", label: "Card bg" },
  { name: "surface-overlay",cssVar: "--color-surface-overlay",hex: "#1A1F28", label: "Overlay" },
  { name: "border",         cssVar: "--color-border",         hex: "#1E2530", label: "Border" },
  { name: "text-primary",   cssVar: "--color-text-primary",   hex: "#CDD6E0", label: "Teks utama" },
  { name: "text-secondary", cssVar: "--color-text-secondary", hex: "#6B8299", label: "Teks sekunder" },
  { name: "text-muted",     cssVar: "--color-text-muted",     hex: "#3D4D5E", label: "Teks muted" },
  { name: "status-success", cssVar: "--color-status-success", hex: "#10B981", label: "Sukses" },
  { name: "status-warning", cssVar: "--color-status-warning", hex: "#F59E0B", label: "Peringatan" },
  { name: "status-danger",  cssVar: "--color-status-danger",  hex: "#EF4444", label: "Bahaya" },
  { name: "status-info",    cssVar: "--color-status-info",    hex: "#60A5FA", label: "Info" },
  { name: "brand-navy",     cssVar: "--color-brand-navy",     hex: "#1B2B4B", label: "Brand navy" },
];

const LIB_VERSIONS: LibVersion[] = [
  { pkg: "next",                  version: "^16.2.4",  role: "Framework" },
  { pkg: "react",                 version: "^19.2.0",  role: "UI runtime" },
  { pkg: "typescript",            version: "^5.8.0",   role: "Type safety" },
  { pkg: "tailwindcss",           version: "^4.3.0",   role: "Styling" },
  { pkg: "shadcn/ui",             version: "4.8.3",    role: "Component lib" },
  { pkg: "zustand",               version: "^5.0.13",  role: "State mgmt" },
  { pkg: "@tanstack/react-query", version: "^5.100.0", role: "Server state" },
  { pkg: "axios",                 version: "^1.15.0",  role: "HTTP client" },
  { pkg: "react-hook-form",       version: "^7.76.0",  role: "Forms" },
  { pkg: "zod",                   version: "^4.0.0",   role: "Validation" },
  { pkg: "@hookform/resolvers",   version: "^5.4.0",   role: "RHF ↔ Zod" },
  { pkg: "lucide-react",          version: "^0.560.0", role: "Icons" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function PhaseStatusBadge({ status }: { status: PhaseStatus }) {
  if (status === "done") {
    return (
      <Badge className="bg-status-success/10 text-status-success border-status-success/20 border text-xs">
        Done
      </Badge>
    );
  }
  if (status === "active") {
    return (
      <Badge className="bg-primary/10 text-primary border-primary/20 border text-xs">
        In Progress
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="text-text-muted border-border text-xs"
    >
      Upcoming
    </Badge>
  );
}

function PhaseIcon({
  status,
  Icon,
}: {
  status: PhaseStatus;
  Icon: React.ElementType;
}) {
  if (status === "done") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-status-success/10">
        <CheckCircle2 size={16} className="text-status-success" />
      </div>
    );
  }
  if (status === "active") {
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Loader size={16} className="text-primary animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-overlay border border-border">
      <Icon size={16} className="text-text-muted" />
    </div>
  );
}

function TokenSwatch({ token }: { token: DesignToken }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="overflow-hidden rounded-md border border-border cursor-default">
            <div
              className="h-9 w-full"
              style={{ backgroundColor: token.hex }}
            />
            <div className="bg-surface-raised px-2 py-1.5">
              <p className="text-text-primary text-[11px] font-medium truncate">
                {token.name}
              </p>
              <p className="text-text-muted font-mono text-[10px] mt-0.5">
                {token.hex}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-surface-raised border-border text-xs"
        >
          <p className="text-text-secondary font-mono">{token.cssVar}</p>
          <p className="text-text-muted mt-0.5">{token.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const FILE_COUNT = 100; // update per phase commit — src/**/* file count

export default function BuildProgressPage() {
  const totalDone = PHASES.filter((p) => p.status === "done").length;
  const overallPct = Math.round(
    PHASES.reduce((sum, p) => sum + p.progress, 0) / PHASES.length
  );
  const activePhase = PHASES.find((p) => p.status === "active");
  const lastDonePhase = PHASES.filter((p) => p.status === "done").at(-1);

  const stats = [
    { label: "Phase selesai", value: `${totalDone} / ${PHASES.length}` },
    { label: "Overall progress", value: `${overallPct}%` },
    { label: "File dibuat", value: String(FILE_COUNT) },
    { label: "Phase tersisa", value: String(PHASES.length - totalDone) },
  ];

  return (
    <div className="space-y-8 pb-12">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-text-muted text-xs uppercase tracking-widest mb-1">
            PayrollOS
          </p>
          <h1 className="text-text-primary text-2xl font-semibold leading-none">
            Build Progress
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            Status perkembangan implementasi sistem payroll
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-text-secondary border-border text-xs mt-1"
        >
          Phase {activePhase?.id ?? PHASES.length} of {PHASES.length}
        </Badge>
      </div>

      {/* ── Alert: next phase ── */}
      {lastDonePhase && activePhase && (
        <Alert className="border-primary/20 bg-primary/5">
          <ArrowRight size={15} className="text-primary mt-0.5" />
          <AlertDescription className="text-text-secondary text-sm">
            Phase {lastDonePhase.id} {lastDonePhase.name} selesai.{" "}
            <span className="text-text-primary font-medium">
              Next: Phase {activePhase.id} — {activePhase.name}
            </span>{" "}
            · {activePhase.description}.
            <Button
              asChild
              variant="link"
              size="sm"
              className="text-primary h-auto p-0 ml-2 text-sm"
            >
              <Link href="/master-data/employees">Mulai →</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-surface-raised border-border">
            <CardContent className="pt-4 pb-4">
              <p className="text-text-muted text-[11px] uppercase tracking-wider mb-1">
                {s.label}
              </p>
              <p className="text-text-primary text-2xl font-semibold leading-none">
                {s.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Overall progress bar ── */}
      <Card className="bg-surface-raised border-border">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-text-secondary text-sm font-medium">
              Overall Progress
            </p>
            <span className="text-text-primary text-sm font-semibold">
              {overallPct}%
            </span>
          </div>
          <Progress
            value={overallPct}
            className="h-2 bg-surface-overlay [&>div]:bg-primary"
          />
          <p className="text-text-muted text-xs mt-2">
            {totalDone} dari {PHASES.length} phase selesai
          </p>
        </CardContent>
      </Card>

      {/* ── Phase roadmap ── */}
      <div>
        <p className="text-text-muted text-[11px] uppercase tracking-widest mb-3">
          Roadmap Phase
        </p>
        <div className="space-y-3">
          {PHASES.map((phase) => (
            <Card
              key={phase.id}
              className={
                phase.status === "active"
                  ? "bg-surface-raised border-primary/30"
                  : "bg-surface-raised border-border"
              }
            >
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start gap-3">
                  <PhaseIcon status={phase.status} Icon={phase.icon} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-text-muted text-[11px] font-mono">
                        {String(phase.id).padStart(2, "0")}
                      </span>
                      <span className="text-text-primary text-sm font-medium">
                        {phase.name}
                      </span>
                      <PhaseStatusBadge status={phase.status} />
                    </div>
                    <p className="text-text-muted text-xs mt-0.5">
                      {phase.description}
                    </p>

                    {phase.status !== "upcoming" && (
                      <div className="mt-3">
                        <Progress
                          value={phase.progress}
                          className="h-1 bg-surface-overlay [&>div]:bg-primary"
                        />
                        <p className="text-text-muted text-[11px] mt-1">
                          {phase.progress}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Checklist detail (done + active phases) ── */}
      <div className="space-y-4">
        <p className="text-text-muted text-[11px] uppercase tracking-widest">
          Checklist Detail
        </p>
        {PHASES.filter((p) => p.status !== "upcoming").map((phase) => (
          <div key={phase.id}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-text-muted text-[11px] font-mono">
                {String(phase.id).padStart(2, "0")}
              </span>
              <span className="text-text-secondary text-xs font-medium">
                {phase.name}
              </span>
              <PhaseStatusBadge status={phase.status} />
            </div>
            <Card className="bg-surface-raised border-border">
              <CardContent className="pt-5 pb-5">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {phase.items.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 py-1">
                      {item.done ? (
                        <CheckCircle2
                          size={13}
                          className="text-status-success shrink-0"
                        />
                      ) : (
                        <Circle
                          size={13}
                          className="text-text-muted shrink-0"
                        />
                      )}
                      <span
                        className={
                          item.done
                            ? "text-text-secondary text-xs"
                            : "text-text-muted text-xs"
                        }
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* ── Design tokens ── */}
      <div>
        <p className="text-text-muted text-[11px] uppercase tracking-widest mb-3">
          Design Tokens — Warna
        </p>
        <Card className="bg-surface-raised border-border">
          <CardContent className="pt-5 pb-5">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {DESIGN_TOKENS.map((token) => (
                <TokenSwatch key={token.name} token={token} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Design tokens: typography & radius ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Typography */}
        <div>
          <p className="text-text-muted text-[11px] uppercase tracking-widest mb-3">
            Tipografi
          </p>
          <Card className="bg-surface-raised border-border h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-text-primary text-sm font-medium">
                Space Grotesk
              </CardTitle>
              <p className="text-text-muted text-xs">
                --font-sans · weights: 300 400 500 600 700
              </p>
            </CardHeader>
            <Separator className="bg-border" />
            <CardContent className="pt-4 space-y-3">
              {[
                { label: "Heading 1", size: "text-2xl", weight: "font-medium", meta: "22px / 500" },
                { label: "Heading 2", size: "text-lg",  weight: "font-medium", meta: "18px / 500" },
                { label: "Body",      size: "text-sm",  weight: "font-normal", meta: "14px / 400" },
                { label: "Caption",   size: "text-xs",  weight: "font-normal", meta: "12px / 400" },
              ].map((t) => (
                <div key={t.label} className="flex items-baseline justify-between">
                  <span className={`${t.size} ${t.weight} text-text-primary`}>
                    {t.label}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-text-muted border-border text-[10px] font-mono"
                  >
                    {t.meta}
                  </Badge>
                </div>
              ))}
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-widest text-text-muted">
                  Label
                </span>
                <Badge
                  variant="outline"
                  className="text-text-muted border-border text-[10px] font-mono"
                >
                  11px uppercase
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Border radius */}
        <div>
          <p className="text-text-muted text-[11px] uppercase tracking-widest mb-3">
            Border Radius
          </p>
          <Card className="bg-surface-raised border-border h-full">
            <CardContent className="pt-5 space-y-4">
              {[
                { name: "sm",   radius: "rounded-sm",   meta: "4px",        desc: "calc(0.5rem - 4px)" },
                { name: "md",   radius: "rounded-md",   meta: "6px",        desc: "calc(0.5rem - 2px)" },
                { name: "lg",   radius: "rounded-lg",   meta: "8px",        desc: "--radius = 0.5rem" },
                { name: "pill", radius: "rounded-full",  meta: "99px",       desc: "badge / status" },
              ].map((r) => (
                <div key={r.name} className="flex items-center gap-3">
                  <div
                    className={`h-9 w-14 shrink-0 bg-primary/20 border border-primary/30 ${r.radius}`}
                  />
                  <div className="flex-1">
                    <p className="text-text-primary text-xs font-medium">
                      {r.name}
                    </p>
                    <p className="text-text-muted text-[11px]">{r.desc}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-text-muted border-border text-[10px] font-mono shrink-0"
                  >
                    {r.meta}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Library versions table ── */}
      <div>
        <p className="text-text-muted text-[11px] uppercase tracking-widest mb-3">
          Stack Versi Library
        </p>
        <Card className="bg-surface-raised border-border">
          <ScrollArea className="rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-text-muted text-[11px] uppercase tracking-wider bg-surface-raised h-9">
                    Package
                  </TableHead>
                  <TableHead className="text-text-muted text-[11px] uppercase tracking-wider bg-surface-raised h-9">
                    Versi
                  </TableHead>
                  <TableHead className="text-text-muted text-[11px] uppercase tracking-wider bg-surface-raised h-9">
                    Peran
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LIB_VERSIONS.map((lib) => (
                  <TableRow
                    key={lib.pkg}
                    className="border-border hover:bg-surface-overlay transition-colors"
                  >
                    <TableCell className="text-text-primary text-sm font-mono py-2.5">
                      {lib.pkg}
                    </TableCell>
                    <TableCell className="py-2.5">
                      <Badge
                        variant="outline"
                        className="text-text-secondary border-border font-mono text-[11px]"
                      >
                        {lib.version}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-text-muted text-xs py-2.5">
                      {lib.role}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      </div>

      {/* ── Footer note ── */}
      <Separator className="bg-border" />
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-text-muted text-xs">
          File ini ada di{" "}
          <code className="text-text-secondary bg-surface-overlay px-1.5 py-0.5 rounded text-[11px]">
            src/app/dev/status/page.tsx
          </code>
        </p>
        <div className="flex items-center gap-2">
          <Circle size={7} className="fill-status-warning text-status-warning" />
          <span className="text-text-muted text-xs">
            {activePhase ? `Phase ${activePhase.id} ${activePhase.name} in progress` : "Semua phase selesai"}
          </span>
        </div>
      </div>

    </div>
  );
}