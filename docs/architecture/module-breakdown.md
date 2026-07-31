# Module Breakdown

Keywords: module, layer, master data, configuration, operational, payroll core, event-based, output, flow

## Layer & Module

| Layer | Module | Notes |
|---|---|---|
| **Master Data** | Employees, Organization, Salary | Setup awal, tidak setiap bulan |
| **Configuration** | Payroll Components, Tax (PTKP/Rate), BPJS | Setup awal, perubahan berdampak global |
| **Operational** | Attendance, Overtime, Loans | Data periodik bulanan |
| **Payroll Core** | Run, Review & Adjustment, Approval & Lock | Proses utama bulanan |
| **Event-Based** | THR, Tax Reconciliation | Tidak setiap bulan |
| **Output** | Payslip, Reports (Payroll, Tax, Loans) | Hanya setelah payroll approved |

## High-Level Flow

```
Master Data ──┐
              ├──► Configuration ──► Operational ──► Payroll Core ──► Output
              │                                              │
              └────────────── Event-Based (THR/Tax) ─────────┘
```
