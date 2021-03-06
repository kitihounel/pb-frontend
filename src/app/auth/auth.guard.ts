import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { map } from 'rxjs/operators'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.sessionExists().pipe(
      map((value) => {
        if (value)
          return true
        return this.checkLogin(state.url)
      })
    )
  }

  checkLogin(url: string): boolean | UrlTree {
    if (this.authService.user)
      return true
    this.authService.redirectUrl = url;
    return this.router.parseUrl('/login');
  }
}
