import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../Models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from '../Models/dto/login';
import { LoginResponse } from '../Models/dto/loginResponse';
import { TokenRefreshRequest } from '../Models/dto/TokenRefreshRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host = environment.apiUrl;
  private token: string ='';
  private loggedInUsername: string= '';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public login(login: LoginRequest): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(`${this.host}/camping/auth/signin`, login, { observe: 'response' });
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/camping/auth/signup`, user);
  }
  public logOutFromDB(tokenRefreshRequest: TokenRefreshRequest): Observable<any> {
    return this.http.post<any>(`${this.host}/camping/auth/logout`, tokenRefreshRequest);
  }
  refreshToken(tokenRefreshRequest: TokenRefreshRequest):Observable<any> {
    return this.http.post<any>(`${this.host}/camping/auth/refreshtoken`, tokenRefreshRequest);
}
public resetPassword(email: string): Observable<any> {
  return this.http.get<any>(`${this.host}/camping/auth/resetpassword/${email}`);
}



  public logOut(): void {
    this.token = '';
    this.loggedInUsername = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): any | null {
    const userString = localStorage.getItem('user');
    if (userString !== null) {
      return JSON.parse(userString);
    }
    return null;
  }

  public loadToken(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.token = token;
    } else {
      this.token = ''; // Assign an empty string as a default value
    }
  }

  public getToken(): string {
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return false; // Add a return statement to handle the case where none of the conditions are satisfied
  }

  public isUserLogged(): boolean {
    return this.token !== '' && !this.jwtHelper.isTokenExpired(this.token);
  }

}
