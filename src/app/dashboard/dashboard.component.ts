import { Component, OnInit } from '@angular/core'
import { AuthService, User } from '../auth/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User

  constructor(public authServive: AuthService) {
    this.user = authServive.user!
  }

  ngOnInit(): void {
  }
}
