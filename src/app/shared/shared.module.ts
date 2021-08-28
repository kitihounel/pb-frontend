import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginationComponent } from './pagination/pagination.component'
import { CrudTableViewComponent } from './crud-table-view/crud-table-view.component'

@NgModule({
  declarations: [
    PaginationComponent,
    CrudTableViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent,
    CrudTableViewComponent
  ]
})
export class SharedModule {}
