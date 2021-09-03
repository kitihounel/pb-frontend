import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { environment as env } from 'src/environments/environment'

export interface AuthUser {
  username: string
  name: string
  role: string
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: AuthUser | undefined

  redirectUrl = ''

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<boolean> {
    const url = `${env.apiUrl}/login`
    const payload = { username, password } 
    return this.http.post<AuthUser>(url, payload).pipe(
      tap((user) => this.setUser(user)),
      map(() => true)
    )
  }

  sessionExists(): Observable<boolean> {
    const token = localStorage.getItem('apiToken')
    if (!token)
      return of(false)

    const url = `${env.apiUrl}/user`
    return this.http.get<AuthUser>(url, {
      headers: { authorization: `Bearer ${token}` }
    }).pipe(
      tap((user) => this.setUser(user)),
      map(() => true)
    )
  }

  logout() {
    this._user = undefined
    localStorage.removeItem('apiToken')
  }

  get user() {
    return this._user
  }

  private setUser(user: AuthUser) {
    this._user = user
    localStorage.setItem('apiToken', user.token)
  }
}
