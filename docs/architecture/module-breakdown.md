# Module Breakdown

Keywords: module, layer, master data, configuration, operational, payroll core, event-based, output, flow

## Layer & Module

| Layer | Module | Notes |
|---|---|---|
| **Master Data** | Employee, Organization, Salary | Setup awal, tidak setiap bulan |
| **Configuration** | Payroll Component, Tax (PTKP/Rate), BPJS | Setup awal, perubahan berdampak global |
| **Operational** | Attendance, Overtime, Loan | Data periodik bulanan |
| **Payroll Core** | Run, Review & Adjustment, Approval & Lock | Proses utama bulanan |
| **Event-Based** | THR, Tax Reconciliation | Tidak setiap bulan |
| **Output** | Payslip, Reports (Payroll, Tax, Loan) | Hanya setelah payroll approved |

## High-Level Flow

```
Master Data ──┐
              ├──► Configuration ──► Operational ──► Payroll Core ──► Output
              │                                           │
              └───────────────── THR / Tax ──────────────┘
```
