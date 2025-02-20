import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawerStateService {
  private _isOpen: boolean = false;

  get isOpen(): boolean {
    return this._isOpen;
  }

  open(): void {
    this._isOpen = true;
  }

  close(): void {
    this._isOpen = false;
  }
}
