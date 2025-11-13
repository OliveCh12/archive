"use client"
import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

// Data Table accept only Offres type
interface Offres {
    id: number
    name: string
}


export function OffresTable() {
    return <div>Offres Table</div>
}