export default interface CrudTableViewMetadata {
  indexColumn?: {
    width: string
  }

  actionColumn?: {
    width: string
  }

  columns: {
    names: string[]
    widths: string[]
    sortable: Set<number>
  }

  properties: string[]
  showEmptyDatasetMessage?: boolean
}
