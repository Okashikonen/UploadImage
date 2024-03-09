import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUploadService } from './services/api-upload.service';

/**
 * The root component of the application.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  /**
   * The API key used for image upload.
   */
  apiKey: string = '';

  /**
   * The base64 representation of the selected image.
   */
  image: string = '';

  /**
   * The URL of the uploaded image.
   */
  imageUrl: string = '';

  /**
   * Flag indicating whether to show the API key input field.
   */
  showApiKey: boolean = false;

  /**
   * The selected file to be uploaded.
   */
  selectedFile: File | null = null;

  constructor(private readonly uploadImageService: ApiUploadService, private toastr: ToastrService) {}

  /**
   * Event handler for the file input change event.
   * @param e - The event object.
   */
  onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.selectedFile = input.files ? input.files[0] : null;
    if (this.selectedFile) {
        this.image = URL.createObjectURL(this.selectedFile);
        this.toastr.success('Archivo seleccionado correctamente');
    } else {
      this.toastr.error('No se ha seleccionado ningún archivo');
    }
  }

  /**
   * Uploads the selected image using the API key.
   * Uploads the selected image to the server.
   * If the API key is not provided, it displays a warning message.
   * If no file is selected, it displays an error message.
   */
  uploadSelectedImage() {
    if (this.apiKey === '') {
        this.toastr.warning('Por favor, ingrese la API Key');
        return;
    }

    if (this.selectedFile) {
        this.uploadImageService.uploadImage(this.selectedFile, this.apiKey).subscribe(
            url => {
                this.imageUrl = url;
                this.toastr.success('Imagen subida correctamente');
            },
            error => {
                this.toastr.error('Ocurrió un error al subir la imagen');
            }
        );
    } else {
        this.toastr.error('No se ha seleccionado ningún archivo');
    }
  }

  /**
   * Event handler for the API key input event.
   * @param e - The event object.
   */
  onApiKeyInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.apiKey = input.value;
  }

  /**
   * Toggles the visibility of the API key input field.
   */
  toggleShowApiKey() {
    this.showApiKey = !this.showApiKey;
  }
}
