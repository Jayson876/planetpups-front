import { Observable } from "rxjs";

export class ImageService {

  constructor(private http: Http) {}


  public uploadImage(image: File): Observable<Response> {
    const formData = new FormData();

    formData.append('dogImage', image);

    return this.http.post('/api/v1/image-upload', formData);
  }
}
