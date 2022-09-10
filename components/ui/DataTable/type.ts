export interface DataTableColumn {
  code: string
  label: string
  colspan: number
}
export interface DataTableRow {
  [key: string]: string
}
export interface LimitItem {
  label: string
  limit: number | null
}
