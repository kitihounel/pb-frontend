import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService, AuthUser } from '../auth/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: AuthUser
  
  constructor(public authService: AuthService, private router: Router) {
    this.user = authService.user!
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }
}
