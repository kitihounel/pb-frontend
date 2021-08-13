import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { map } from 'rxjs/operators'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class LoginComponentGuard implements CanActivate {
  constructor(public authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user ? this.router.parseUrl('/') : this.authService.sessionExists().pipe(
      map((value) => value ? this.router.parseUrl('/') : true)
    )
  }
}
