import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component'
import { TableViewComponent } from 'src/app/shared/table-view/table-view.component'

@NgModule({
  declarations: [
    PaginationComponent,
    TableViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent,
    TableViewComponent
  ]
})
export class SharedModule {}
