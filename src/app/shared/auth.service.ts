import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment';
import { lastValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public async login(User: object) {
    return await lastValueFrom(this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User)
    .pipe(
      tap(this.setToken)
    ))
  }

  private setToken(response: any) {
    if (response) {
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', expData.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }    
  }

  get token(): null | string {
    const expDate = new Date(localStorage.getItem('fb-token-exp')!);
    if (new Date > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  public logout() {
    this.setToken(null);
  }

  public isAuthenticated() {
    return !!this.token;
  }
}
