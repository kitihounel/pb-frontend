import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DoctorsRoutingModule } from './doctors-routing.module'
import { DoctorListComponent } from './doctor-list/doctor-list.component'
import { DoctorHomeComponent } from './doctor-home/doctor-home.component'


@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorHomeComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule
  ]
})
export class DoctorsModule { }
