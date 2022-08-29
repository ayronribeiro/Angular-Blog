import { Component, OnInit, ElementRef, NgZone, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  private scrollElement = null;
  private scrollSize = null;
  private scrollTop = 0;
  private destroyed = false;
  private lastWidth = 0;
  private lastHeight = 0;
  private lastScrollHeight = 0;
  private lastScrollWidth = 0;
  private _bottom = false;
  private scrolled = false;

  @Input() loader = false;

  private events = {
    mouseup: () => {
      if (this.scrolled) {
        if (this.bottom) {
          this.scrolled = false;
          if (this.hasScroll) this.reachBottom.emit();
        }

        if (this.top) {
          if (this.hasScroll) this.reachTop.emit();
        }
      }

    }
  }

  @Input('reverse') reverse = false;

  @Output('reach.top') reachTop = new EventEmitter();
  @Output('reach.bottom') reachBottom = new EventEmitter();
  @Output('change') change = new EventEmitter();
  @Output('scroll') scroll = new EventEmitter();


  constructor(private element: ElementRef, private NgZone: NgZone) {
    this.scrollElement = element.nativeElement;

    this.NgZone.runOutsideAngular(() => {
      let timeout;
      this.scrollElement.addEventListener("wheel", () => {
        this.scrolled = true;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (this.bottom) {
            if (this.hasScroll) {
              this.NgZone.run(() => {
                this.reachBottom.emit();
              });
            }
            this.scrolled = false;
          }
          if (this.top) {
            if (this.hasScroll) {
              this.NgZone.run(() => {
                this.reachTop.emit();
              });
            }
          }
        }, 200);
      });
      this.scrollElement.addEventListener('mousedown', (e) => {
        if(e.offsetX > this.scrollElement.scrollWidth){
          this.scrolled = true;
        }
      });
    });

    const update = () => {
      if (this.destroyed) return;
      this.NgZone.runOutsideAngular(() => {
        const computed = window.getComputedStyle(this.scrollElement, null);
        
        const margin = [
          parseFloat(computed.getPropertyValue('padding-top')),
          parseFloat(computed.getPropertyValue('padding-right')),
          parseFloat(computed.getPropertyValue('padding-bottom')),
          parseFloat(computed.getPropertyValue('padding-left'))
        ]

        const scrollVertical = this.scrollElement.scrollHeight;
        const scrollHorizontal = this.scrollElement.scrollWidth;

        const width = this.scrollElement.clientWidth - margin[1] - margin[3];
        if (width != this.lastWidth) {
          this.lastWidth = width;
          this.scrollElement.style.setProperty(`--container-width`, `${width}px`);
        }

        const height = this.scrollElement.clientHeight - margin[0] - margin[2];
        if (height != this.lastHeight) {
          this.lastHeight = height;
          this.scrollElement.style.setProperty(`--container-height`, `${height}px`);
        }

        const scrollHeight = scrollVertical - margin[0] - margin[2];
        if (scrollHeight != this.lastScrollHeight) {
          this.lastScrollHeight = scrollHeight;
          this.scrollElement.style.setProperty(`--container-scroll-height`, `${scrollHeight}px`);
        }
        
        const scrollWidth = scrollHorizontal - margin[1] - margin[3];
        if (scrollWidth != this.lastScrollWidth) {
          this.lastScrollWidth = scrollWidth;
          this.scrollElement.style.setProperty(`--container-scroll-width`, `${scrollWidth}px`);
        }

        const scrollTop = this.scrollElement.scrollTop;

        if (this.reverse) {
          if (this.scrolled && (!scrollTop || scrollTop != this.scrollTop) && scrollVertical != this.scrollSize) {
            this.scrollElement.scrollTop = this.scrollTop + (scrollVertical - this.scrollSize);
          }
          if (!this.scrolled) {
            this.scrollElement.scrollTop = scrollVertical;
          }
          this.scrollSize = scrollVertical;
          this.scrollTop = this.scrollElement.scrollTop;
        }

        this._bottom = (scrollTop + 15) >= (scrollVertical - this.scrollElement.offsetHeight);

        requestAnimationFrame(update);
      });
    }

    update();
  }

  ngOnInit(): void {

  }

  fullscreen() {
    this.element.nativeElement.requestFullscreen();
  }

  toBottom() {
    setTimeout(() => {
      this.scrollElement.scrollTop = this.scrollElement.scrollHeight;
    }, 50);
    this.scrolled = false;
  }


  get hasScroll() {
    return this.scrollElement.scrollHeight > this.scrollElement.offsetHeight;
  }

  get top() {
    return this.scrollElement.scrollTop < 15;
  }

  get bottom() {
    return this._bottom;
  }

  scrollTo(top){
    setTimeout(() => {
      this.scrollElement.scrollTop = top;
    }, 50);
    this.scrolled = true;
  }


  ngOnDestroy() {
    this.destroyed = true;
    for (let event in this.events) {
      window.removeEventListener(event, this.events[event]);
    }
  }
  


}
