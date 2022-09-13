import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, of } from 'rxjs';
import { User } from 'interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private REST_API_URL = environment.BASE_API_URL + '/users';
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.REST_API_URL}`, this.HTTP_HEADER)
    // .pipe(
    //   tap((userList) => console.log(`${JSON.stringify(userList)}`)),
    //   catchError((_error) => of([]))
    // );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.REST_API_URL}/${id}`)
    //   .pipe(
    //   tap((retrievedUser) => console.log(`${JSON.stringify(retrievedUser)}`)),
    //   catchError((error) => of())
    // );
  }

  createUser(body: object): Observable<User> {
    return this.http
      .post<User>(`${this.REST_API_URL}`, body, this.HTTP_HEADER)
      // .pipe(
      //   tap((addedUser) => console.log(`${JSON.stringify(addedUser)}`)),
      //   catchError((error) => of())
      // );
  }

  updateUser(id: string, body: object): Observable<User> {
    // console.log(id, body);
    return this.http
      .put<User>(`${this.REST_API_URL}/${id}`, body, this.HTTP_HEADER)
      // .pipe(
      //   tap((updatedUser) => console.log(`${JSON.stringify(updatedUser)}`)),
      //   catchError((error) => of())
      // );
  }

  deleteUserById(id: string): Observable<User> {
    return this.http.delete<User>(`${this.REST_API_URL}/${id}`)
    //   .pipe(
    //   tap((deletedUser) => console.log(`${JSON.stringify(deletedUser)}`)),
    //   catchError((error) => of())
    // );
  }
}
