import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit, OnDestroy {

  destroyed = false;
  last = 0;

  constructor(private element: ElementRef, private ngZone: NgZone) {
    this.update();
  }

  ngOnInit(): void {

  }


  update = () => {
    if (this.destroyed) return;
    this.ngZone.runOutsideAngular(() => {

      const computedStyle = window.getComputedStyle(this.element.nativeElement, null);
      const lineHeight = parseFloat(computedStyle.getPropertyValue('line-height'));
      const height = this.element.nativeElement.offsetHeight;
      const value = Math.floor(height / lineHeight);
      if (value != this.last) {
        this.last = value;
        this.element.nativeElement.style.webkitLineClamp = Math.floor(height / lineHeight);
      }

      requestAnimationFrame(this.update);
    });
  }

  ngOnDestroy() {
    this.destroyed = true;
  }

}
