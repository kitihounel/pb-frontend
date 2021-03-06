import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { TableViewEvent } from './table-view-event'
import { TableViewMetadata } from './table-view-metadata'

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit, OnChanges {

  @Input() meta!: TableViewMetadata
  @Input() data!: any[]

  @Output() notify = new EventEmitter<TableViewEvent>()

  itemDisplayOrder = [] as number[]
  columnSortOrder = new Map<number, string>()
  sortColumn: number | undefined

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const data = changes.data.currentValue as any[]
    this.sortColumn = undefined
    this.columnSortOrder.clear()
    this.itemDisplayOrder = data.map((v, i) => i)
  }

  ngOnInit(): void {
    this.itemDisplayOrder = this.data.map((v, i) => i)
  }

  sortByColumn(i: number) {
    const oldSortOrder = this.columnSortOrder.get(i)
    const newSortOrder = oldSortOrder === 'desc' || oldSortOrder === undefined ? 'asc' : 'desc'
    
    const prop = this.meta.properties[i]
    const a = this.data.map((item, i) => ({ key: item[prop], index: i }))
    a.sort((first, other) => {
      const inv = newSortOrder === 'asc' ? 1 : -1
      if (first.key === other.key)
        return (first.index - other.index) * inv
      return (first.key < other.key ? -1 : 1) * inv
    })
    
    this.columnSortOrder.set(i, newSortOrder)
    this.sortColumn = i
    this.itemDisplayOrder = a.map(item => item.index)
  }

  isBoolean(value: any) {
    return typeof value === 'boolean'
  }

  emitActionEvent(row: number, action: 'edit' | 'delete' | 'show') {
    this.notify.emit({ row, action })
  }
}
