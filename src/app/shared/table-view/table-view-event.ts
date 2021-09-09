export interface TableViewEvent {
  row: number
  action: 'show' | 'edit' | 'delete'
}
