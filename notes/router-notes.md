# Notes

## How to Create a Feature Module
Angular doc recommands to regroup application features in modules. Each module will declare its routes,
components, services, etc.

To generate a module, run:
```bash
ng generate module dummy -m app --routing
```
- `-m | --module` indicates the declaring module, generally `app`.
- `--routing` creates a routing module, i.e. add a `dummy-routing.module.ts` file.

The command above will genrate a folder named `dummy` within the `src/app` folder with
two files: `dummy.module.ts` and `dummy-routing.module.ts`.

Note that if you have an `app-routing.mdule.ts` file where you declared some routes, you must include
your new module class before the `AppRoutingModule` class so that wildcard routes won't hide
your module routes.

Excerpt from the `AppModule` class.
```js
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SomeModule, // Here...
    AppRoutingModule
  ],
  declarations: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Child routing
You can create a feature module with several components and intern routes. The feature module
will have a root component and child components.

```bash
ng generate module admin --routing
ng generate component admin/admin-dashboard
ng generate component admin/admin
ng generate component admin/manage-crises
ng generate component admin/manage-heroes
```

Now in the routing module, you can declare routes. Note that in the following example,
since the path to `AdminDashboardComponent` is the empty string, accessing `site.com/admin` will
display the `AdminComponent` and the `AdminDashboardComponent` at the `router-outlet` emplacement.
```js
const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'crises', component: ManageCrisesComponent },
      { path: 'heroes', component: ManageHeroesComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
```

The `AdminComponent` template shoud include a `router-outlet` element for intern routing.
The code sample also uses relative routing. Usind path begining with `./` indicates routing
inside the current module.
```html
<h3>ADMIN</h3>
<nav>
  <a routerLink="./" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
    Dashboard
  </a>
  <a routerLink="./crises" routerLinkActive="active">Manage Crises</a>
  <a routerLink="./heroes" routerLinkActive="active">Manage Heroes</a>
</nav>
<router-outlet></router-outlet>
```

Although the admin dashboard RouterLink only contains a relative slash without an additional
URL segment, it is a match to any route within the admin feature area. You only want the
Dashboard link to be active when the user visits that route. Adding an additional binding to
the Dashboard routerLink, `[routerLinkActiveOptions]="{ exact: true }"`, marks the `./` link
as active when the user navigates to the /admin URL and not when navigating to any of the child routes.

## Route guards

### `CanActivate`: requiring authentication
Applications often restrict access to a feature area based on who the user is. You could permit access
only to authenticated users or to users with a specific role. You might block or limit access until the
user's account is activated.

The CanActivate guard is the tool to manage these navigation business rules.

The following example extends the `admin` example shown above by creating an `auth` module with a guard,
a login service, and login a component used to manage user authentication.

**Note:** The login component can't be included in the `admin` module since it is a restricted section,
but users should be able to login. Hence access to login should be available to everyone.

```bash
ng generate module auth --routing -m app
ng generate guard auth/auth
```

The code generated for the guard should be similar to this:
```js
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }
}
```

Next, open `admin-routing.module.ts`, import the `AuthGuard` class, and update the admin route with
a `canActivate` guard property that references it:
```js
import { AuthGuard } from '../auth/auth.guard';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      // ...
    ]
  }
// ...
```

The admin feature is now protected by the guard, but the guard requires more customization to work fully.

The AuthGuard should call an application service that can login a user and retain information about the
current user. Generate a new AuthService in the auth folder:
```bash
ng generate service auth/auth
```

Update the AuthService to log in the user:
```js
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username, password): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
```

Now, revise the AuthGuard to call the AuthService.
```js
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): true|UrlTree {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/login');
  }
}
```

Notice that you inject the AuthService and the Router in the constructor.

This guard returns a synchronous boolean result. If the user is logged in, it returns true
and the navigation continues.

The `ActivatedRouteSnapshot` contains the future route that will be activated and the `RouterStateSnapshot`
contains the future `RouterState` of the application, should you pass through the guard check.

If the user is not logged in, you store the attempted URL the user came from using the `RouterStateSnapshot.url`
and tell the router to redirect to a login page — a page you haven't created yet. Returning a `UrlTree`
tells the Router to cancel the current navigation and schedule a new one to redirect the user.

Now we need a `LoginComponent` for the user to log in to the app. After logging in, you'll redirect
to the stored URL if available, or use the default URL. There is nothing new about this component
or the way you use it in the router configuration.
```bash
ng generate component auth/login
```

```html
<h2>Login</h2>
<p>
  <button (click)="login()"  *ngIf="!authService.isLoggedIn">Login</button>
  <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
</p>
```

```js
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService, public router: Router) {
  }

  login() {
    // Get username and passwords before this...
    this.authService.login(username, password).subscribe(() => {
      if (this.authService.isLoggedIn) {
        // Redicrect the user.
        const redirectUrl = authService.redirectUrl || '/admin';
        // Redirect the user
        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
```

## `CanActivateChild`: guarding child routes
See *https://angular.io/guide/router-tutorial-toh#canactivatechild-guarding-child-routes*.

`CanActivateChild` is interessing when used with component-less routes.

## `CanDeactivate`: handling unsaved changes
See *https://angular.io/guide/router-tutorial-toh#candeactivate-handling-unsaved-changes*.
