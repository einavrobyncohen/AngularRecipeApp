import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { User } from '../models/User.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpirationTimer: any
  user = new BehaviorSubject<User>(null);
  


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unkown error'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email doesnt exist'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong password'
        break;
    }
    return throwError(errorMessage)
  }

  private handleAuthentication(email: string, userId:string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000)
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    )
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user))
  }


  constructor(private http: HttpClient, private router: Router) { }

  autoLogin() {
    const userData:{
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'))

    if (!userData) return

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if (loadedUser.token) {
      this.user.next(loadedUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime()- new Date().getTime()
      this.autoLogout(expirationDuration)
    }
    
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(()=> {
      this.logout();
    },expirationDuration)
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError)
        ,tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn)
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap( resData=> {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn)
      })
    );
  }
}
