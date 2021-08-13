import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  loginFailure = false
  error = false

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const username = this.username.trim()
    const password = this.password.trim()
    if (username.length == 0 || password.length == 0)
      return
    this.login(username, password)
  }

  private login(username: string, password: string): void {
    this.authService.login(username, password).subscribe(
      () => {
        this.loginFailure = this.error = false
        const redirectUrl = this.authService.redirectUrl || '/'
        this.router.navigate([redirectUrl])
      },
      (error: HttpErrorResponse) => {
        this.loginFailure = error.status == 401
        this.error = !this.loginFailure
      }
    )
  }
}
