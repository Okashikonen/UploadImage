import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
/**
 * Service for uploading images using the ImgBB API.
 */
export class ApiUploadService {

  uploadUrl: string = 'https://api.imgbb.com/1/upload';

  constructor(private readonly httpCliente: HttpClient) { }

  /**
   * Uploads an image file to the ImgBB API.
   * @param file - The image file to upload.
   * @param apiK - The API key for authentication.
   * @returns An Observable that emits the URL of the uploaded image.
   */
  uploadImage(file: File, apiK: string): Observable<string> {
    const formData = new FormData();
    formData.append('image', file);

    return this.httpCliente.post('https://api.imgbb.com/1/upload', formData, { params: { key: apiK } } )
      .pipe(map((response: any) => response['data']['url']));
  }
}
