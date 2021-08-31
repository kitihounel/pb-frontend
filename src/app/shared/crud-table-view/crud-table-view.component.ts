import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'

export interface CrudTableViewConfig {
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
  data: any[]
  showEmptyDatasetMessage?: boolean
}

@Component({
  selector: 'app-crud-table-view',
  templateUrl: './crud-table-view.component.html',
  styleUrls: ['./crud-table-view.component.css']
})
export class CrudTableViewComponent implements OnInit, OnChanges {

  @Input() config!: CrudTableViewConfig

  sortOrder = [] as number[]

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const data = changes.config.currentValue.data as any[]
    this.sortOrder = data.map((v, i) => i)
  }

  ngOnInit(): void {
    this.sortOrder = this.config.data.map((v, i) => i)
  }

  sortByProperty(prop: string) {
    const a = this.config.data.map((item, i) => ({ key: item[prop], index: i }))
    a.sort((first, other) => {
      if (first.key == other.key)
        return first.index - other.index
      return first.key < other.key ? -1 : 1
    })
    this.sortOrder = a.map(item => item.index)
  }
}
