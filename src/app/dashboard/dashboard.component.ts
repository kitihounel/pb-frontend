import { Component, OnInit } from '@angular/core'
import { AuthService, AuthUser } from '../auth/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: AuthUser

  constructor(public authServive: AuthService) {
    this.user = authServive.user!
  }

  ngOnInit(): void {
  }
}
