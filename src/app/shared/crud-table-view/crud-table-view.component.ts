import { Component, Input, OnInit } from '@angular/core'

export interface CrudTableViewConfig {
  indexColumnWidth: string
  actionsColumnWidth: string
  columnNames: string[]
  columnWidths: string[]
  properties: string[]
  sortableColumns: Set<number>
  data: any[]
  showEmptyDatasetMessage?: boolean
}

@Component({
  selector: 'app-crud-table-view',
  templateUrl: './crud-table-view.component.html',
  styleUrls: ['./crud-table-view.component.css']
})
export class CrudTableViewComponent implements OnInit {

  @Input() config!: CrudTableViewConfig

  constructor() {}

  ngOnInit(): void {
  }
}
