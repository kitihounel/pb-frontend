export interface TableViewMetadata {
  indexColumn?: {
    width: string
  }

  actionColumn?: {
    width: string
    show?: boolean
    edit?: boolean
    delete?: boolean
  }

  columns: {
    names: string[]
    widths: string[]
    sortable: Set<number>
  }

  properties: string[]
  showEmptyDatasetMessage?: boolean
}
