import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DoctorsRoutingModule } from './doctors-routing.module'
import { DoctorListComponent } from './doctor-list/doctor-list.component'
import { DoctorHomeComponent } from './doctor-home/doctor-home.component'
import { ModalModule } from '../modal/modal.module'

@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorHomeComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    ModalModule,
  ]
})
export class DoctorsModule { }
