import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HashService } from '../../../services/hash.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnDestroy {


  @Output('update') $update = new EventEmitter();

  @Output('close') $close = new EventEmitter();

  @Input('canClose') canClose = true;

  events = {
    keydown: (e) => {
      if (e.key === 'Escape') {
        if (this.active) {
          this.close();
        }
      }
    }
  }

  _hash = null;
  active = false;
  _params = null;
  callback = (active, params) => {
    if (active) {
      this._params = params;
      const obj = {};
      params.forEach((a, b) => {
        obj[b] = a;
      });
      setTimeout(() => {
        this.$update.emit(obj);
      });
    } else if (this.active) {
      this.$close.emit();
    }

    this.active = active;
  }

  param(name) {
    if (!this._params) return null;
    return this._params.get(name);
  }


  @Input() set hash(hash) {
    this.ngOnDestroy();
    this._hash = hash;
    this.hashService.on(this._hash, this.callback);
  };

  get hash(){
    return this._hash;
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private hashService: HashService,
    private router: Router
  ) {
    setTimeout(() => {
      this.renderer.appendChild(document.querySelector('app-overlay-area'), this.elementRef.nativeElement);
    });
  }

  ngOnInit(): void {
    for (let event in this.events) {
      window.addEventListener(event, this.events[event]);
    }
  }

  ngOnDestroy() {
    if (this._hash) {
      this.hashService.off(this._hash, this.callback);
    }
    this.renderer.removeChild(document.querySelector('app-overlay-area'), this.elementRef.nativeElement);

    for (let event in this.events) {
      window.removeEventListener(event, this.events[event]);
    }
  }

  close() {
    if (this.canClose) {
      setTimeout(() => {
        this.router.navigate([], { fragment: null, replaceUrl: true });
      });
    }
  }

  open() {
    setTimeout(() => {
      this.router.navigate([], { fragment: this.hash })
    });
  }

}
