import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

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
    AuthModule,
    AppRoutingModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
