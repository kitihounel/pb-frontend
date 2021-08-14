import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../auth/auth.guard'
import { DoctorHomeComponent } from './doctor-home/doctor-home.component'
import { DoctorListComponent } from './doctor-list/doctor-list.component'

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DoctorHomeComponent,
    children: [
      { path: '', component: DoctorListComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
