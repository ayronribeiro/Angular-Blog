import { Injectable } from '@angular/core';
import { Router, Scroll } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  private activeHash: string;
  private activeParams: URLSearchParams = new URLSearchParams();
  private _callbacks: { [key: string]: Function[] } = {};

  constructor(private router: Router) {
    this.router.events.subscribe((val: Scroll) => {
      if (val instanceof Scroll) {
        this.set(val.anchor);
        for (let hash in this._callbacks) {
          this._callbacks[hash].forEach((cb) => {
            cb(hash == this.activeHash, this.activeParams);
          });
        }
      }
    });

    this.set(decodeURIComponent(window.location.hash.replace('#', '')));
  }


  private set(anchor: string) {
    this.activeParams = new URLSearchParams();
    if (anchor) {
      if (anchor.includes('?')) {
        const split = anchor.split('?');
        this.activeHash = split[0];
        this.activeParams = new URLSearchParams(split[1]);
      } else {
        this.activeHash = anchor;
      }
    } else {
      this.activeHash = null;
    }
  }


  on(hash: string, cb: (active: boolean, params: URLSearchParams) => any) {
    this.off(hash, cb);
    if (!this._callbacks[hash]) {
      this._callbacks[hash] = [];
    }
    this._callbacks[hash].push(cb);
    cb(hash == this.activeHash, this.activeParams);
  }

  off(hash: string, cb: (active: boolean, params: URLSearchParams) => any) {
    const arr = this._callbacks[hash];
    if (arr) {
      const index = arr.indexOf(cb);
      if (index > -1) {
        arr.splice(index, 1);
        if (!arr.length) {
          delete this._callbacks[hash];
        }
      }
    }
  }

}
