import { Directive, ElementRef, OnDestroy, NgZone } from '@angular/core';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective implements OnDestroy {


  private node: HTMLElement;
  private parent: HTMLElement;

  private active = false;

  private startX = 0;
  private startY = 0;
  private offsetX = 0;
  private offsetY = 0;
  private startTransform = '';
  private lastTranslate = '';


  private globals = {
    mousemove: (e) => {
      this.move(e.clientX, e.clientY);
    },
    mouseup: (e) => {
      this.active = false;
    }
  }


  constructor(private element: ElementRef, private ngZone: NgZone) {

    this.node = element.nativeElement;
    this.parent = this.node.parentElement;

    element.nativeElement.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.grab(e.clientX, e.clientY);
    });

    this.ngZone.runOutsideAngular(() => {
      for (let event in this.globals) {
        window.addEventListener(event, this.globals[event]);
      }
    });
  }

  grab(x: number, y: number) {
    this.startX = x;
    this.startY = y;
    let transform = this.node.style.transform;
    if (transform.indexOf(this.lastTranslate) > -1) {
      this.startX -= this.offsetX;
      this.startY -= this.offsetY;
      transform = transform.replace(this.lastTranslate, '').trim();
    }

    this.startTransform = transform;
    this.active = true;
  }

  move(x: number, y: number) {
    if (this.active) {
      const movedX = x - this.startX;
      const movedY = y - this.startY;
      this.offsetX = movedX;
      this.offsetY = movedY;
      const translate = `translate(${movedX}px, ${movedY}px)`;
      this.node.style.transform = `${this.startTransform} ${translate}`;
      this.lastTranslate = translate;
    }
  }

  ngOnDestroy() {
    for (let event in this.globals) {
      window.removeEventListener(event, this.globals[event]);
    }
  }

}
