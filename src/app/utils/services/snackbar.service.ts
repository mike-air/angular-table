import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private _isOpen = false;
  private _message = '';
  private _type: 'success' | 'error' = 'success';

  constructor() {
    console.log(this._isOpen);
  }
  get isOpen(): boolean {
    return this._isOpen;
  }

  get message(): string {
    return this._message;
  }

  get type(): 'success' | 'error' {
    return this._type;
  }

  showSnackbar(message: string, type: 'success' | 'error' = 'success') {
    this._message = message;
    this._type = type;
    this._isOpen = true;
    setTimeout(() => {
      this.close();
    }, 3000); // Automatically close after 3 seconds
  }

  close() {
    this._isOpen = false;
  }
}
