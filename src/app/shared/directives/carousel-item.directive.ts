import { Directive, ElementRef, Host, Optional, OnDestroy, AfterContentInit } from '@angular/core';
import { CarouselDirective } from './carousel.directive';

@Directive({
  selector: '[carouselItem],app-tab'
})
export class CarouselItemDirective implements AfterContentInit, OnDestroy {

  constructor(public element: ElementRef, @Optional() @Host() private parent?: CarouselDirective) {

  }

  ngAfterContentInit(): void {
    if (!this.parent) {
      return;
    }

    this.parent.append(this.element.nativeElement);
  }
  ngOnDestroy() {
    if (this.parent) {
      this.parent.remove(this.element.nativeElement);
    }
  }
}
