import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthModule } from './auth/auth.module'
import { HomeComponent } from './home/home.component'
import { NavbarComponent } from './navbar/navbar.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import InitialsPipe from 'src/utils/InitialsPipe'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { ModalModule } from './modal/modal.module'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    SidebarComponent,
    InitialsPipe,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    AppRoutingModule,
    ModalModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
