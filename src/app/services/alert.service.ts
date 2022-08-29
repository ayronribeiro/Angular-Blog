import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private _timer;
  private _active = false;
  private _type = 'success';
  private _title = '';
  private _description = '';


  constructor() { }


  get active() {
    return this._active;
  }

  get type() {
    return this._type;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }


  private set(type, title, description) {
    clearTimeout(this._timer);
    this._active = false;
    this._type = type;
    this._title = title;
    this._description = description;

    setTimeout(() => {
      this._active = true;

      this._timer = setTimeout(() => {
        this._active = false;
      }, 5000);
    }, 500);

  }

  success(title, description) {
    this.set('success', title, description);
  }

  warning(title, description) {
    this.set('warning', title, description);
  }

  danger(title, description) {
    this.set('danger', title, description);
  }

  close() {
    this._active = false;
  }


}
