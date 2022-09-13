import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dog, Gender } from 'interfaces/dog';
import { User } from 'interfaces/user';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private REST_API_URL = environment.BASE_API_URL + '/dogs';
  private HTTP_HEADER = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getAllDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(`${this.REST_API_URL}`);
    // .pipe(
    //   tap((dogList) => console.log(`${JSON.stringify(dogList)}`)),
    //   catchError((_error) => of([]))
    // );
  }

  getDogById(id: string): Observable<Dog> {
    return this.http.get<Dog>(`${this.REST_API_URL}/${id}`);
    // .pipe(
    //       tap((retrievedDog) => console.log(`${JSON.stringify(retrievedDog)}`)),
    //       catchError((error) => of())
    //     );
  }

  createDogPost(formData: FormData, id: string): Observable<Dog> {
    // console.log('THIS IS FORM DATA: ', formData);
    return this.http.post<Dog>(`${this.REST_API_URL}/user/${id}`, formData);
    // .pipe(
    //   tap((addedDog) => console.log(`${JSON.stringify(addedDog)}`)),
    //   catchError((error) => of())
    // );
  }
  // createDogPost(body:object, id: string):Observable<Dog>{
  //   return this.http.post<Dog>(`${this.REST_API_URL}/users/${id}`, body).pipe(
  //     tap( addedDog => console.log(`${JSON.stringify(addedDog)}`)),
  //     catchError( error => of())
  //   )
  // }

  updateDog(id: string, body: object): Observable<Dog> {
    return this.http.put<Dog>(`${this.REST_API_URL}/${id}`, body).pipe(
      tap((updatedDog) => console.log(`${JSON.stringify(updatedDog)}`)),
      catchError((error) => of())
    );
  }

  deleteDogById(id: string): Observable<Dog> {
    return this.http.delete<Dog>(`${this.REST_API_URL}/${id}`);
    //   .pipe(
    //   tap((deletedDog) => console.log(`${JSON.stringify(deletedDog)}`)),
    //   catchError((error) => of())
    // );
  }

  getAllUserDogs(id: string): Observable<Dog[]> {
    return this.http.get<Dog[]>(`${this.REST_API_URL}/user/${id}`);
    // .pipe(
    //   tap((userDogs) => console.log(`${JSON.stringify(userDogs)}`)),
    //   catchError((_error) => of([]))
    // );
  }

  getAllSearchedDogs(searchText: string): Observable<Dog[]> {
    return this.http.get<Dog[]>(`${this.REST_API_URL}/all/${searchText}`);
  }

  filteredDogs(body: any): Observable<Dog[]> {
    return this.http.get<Dog[]>(
      `${this.REST_API_URL}?gender=${body.gender}&breed=${body.breed}&price=${body.price}`
    );
  }
}
