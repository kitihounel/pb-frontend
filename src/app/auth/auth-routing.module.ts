import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponentGuard } from './login-component.guard'
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginComponentGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
