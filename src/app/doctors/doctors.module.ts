import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DoctorsRoutingModule } from './doctors-routing.module'
import { DoctorListComponent } from './doctor-list/doctor-list.component'
import { DoctorHomeComponent } from './doctor-home/doctor-home.component'
import { ModalModule } from '../modal/modal.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component'
import { DoctorFormComponent } from './doctor-form/doctor-form.component'

@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorHomeComponent,
    DoctorDetailsComponent,
    DoctorFormComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    ModalModule,
    SharedModule
  ]
})
export class DoctorsModule {}
