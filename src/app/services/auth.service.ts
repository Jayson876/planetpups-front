import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError, of } from 'rxjs';
import { User } from 'interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private REST_API_URL = environment.BASE_API_URL + '/auth';
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) {}

  login(body:object): Observable<User> {
    return this.http.post<User>(`${this.REST_API_URL}/login`, body, this.HTTP_HEADER);
  }
  register(body:object): Observable<User> {
    return this.http.post<User>(`${this.REST_API_URL}/register`, body, this.HTTP_HEADER);
  }
  logout(): Observable<any> {
    return this.http.get<any>(this.REST_API_URL + '/logout', this.HTTP_HEADER);
  }
}
