import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'

export interface CrudTableViewMetadata {
  indexColumn?: {
    width: string
  }
  actionsColumn?: {
    width: string
  }
  columnNames:  string[]
  columnWidths: string[]
  properties:   string[]
  sortableColumns: Set<number>
  showEmptyDatasetMessage?: boolean
}

@Component({
  selector: 'app-crud-table-view',
  templateUrl: './crud-table-view.component.html',
  styleUrls: ['./crud-table-view.component.css']
})
export class CrudTableViewComponent implements OnInit, OnChanges {

  @Input() meta!: CrudTableViewMetadata
  @Input() data!: any[]

  itemDisplayOrder = [] as number[]
  columnSortOrder = new Map<number, string>()
  sortColumn: number | undefined

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const data = changes.data.currentValue as any[]
    this.itemDisplayOrder = data.map((v, i) => i)
    this.sortColumn = undefined
    this.columnSortOrder.clear()
  }

  ngOnInit(): void {
    this.itemDisplayOrder = this.data.map((v, i) => i)
  }

  sortByColumn(i: number) {
    const oldSortOrder = this.columnSortOrder.get(i)
    const newSortOrder = oldSortOrder === 'desc' || oldSortOrder === undefined ? 'asc' : 'desc'
    this.columnSortOrder.set(i, newSortOrder)
    this.sortColumn = i

    const prop = this.meta.properties[i]
    const a = this.data.map((item, i) => ({ key: item[prop], index: i }))
    a.sort((first, other) => {
      if (first.key == other.key)
        return (first.index - other.index) * (newSortOrder === 'asc' ? 1 : -1)
      return (first.key < other.key ? -1 : 1) * (newSortOrder === 'asc' ? 1 : -1)
    })

    this.itemDisplayOrder = a.map(item => item.index)
  }
}
