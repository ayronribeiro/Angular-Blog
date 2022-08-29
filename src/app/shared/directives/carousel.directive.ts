import { Directive, OnInit, OnDestroy, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as Flickity from 'flickity';
@Directive({
  selector: '[carousel]'
})
export class CarouselDirective implements OnInit, OnDestroy {
  public slider: any;
  public items = [];
  private timer;
  public options = {cellAlign: 'center', pageDots: false, prevNextButtons: false, setGallerySize: true, percentPosition: true, contain: true, freeScroll: true};
  private updateVisual;

  @Output('carousel.scroll') eventScroll = new EventEmitter();
  @Output('carousel.select') eventSelect = new EventEmitter();

  @Input('carousel') set carousel(options) {
    for(let key in options){
      this.options[key] = options[key];
    }
  };

  constructor(public element: ElementRef) {
    this.slider = new Flickity(this.element.nativeElement, this.options);
  }

  setEvents() {
    this.slider.on('scroll', (progress) => {
      progress = Math.max(0, Math.min(1, progress));
      this.eventScroll.emit(progress);
    });

    this.slider.on('select', (index) => {
      this.eventSelect.emit(index);
    });
  }

  init() {
    setTimeout(() => {
      if (this.slider) {
        this.slider.destroy();
      }
      this.slider = new Flickity(this.element.nativeElement, this.options);
      this.setEvents();
      this.updateElements();
    });
  }

  get selectedIndex() {
    return this.slider.selectedIndex;
  }

  public append(item) {

    const index = this.items.indexOf(item);
    if (index < 0) {
      this.items.push(item);
      this.updateElements();
    }
  }

  remove(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  select(index, isWrapped?, isInstant?) {
    this.slider.select(index, isWrapped, isInstant);
  }


  ngOnInit() {
    this.updateVisual = () => {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.slider.resize();
      }, 1000);
    }
    window.addEventListener('resize', this.updateVisual);
    this.init();
  }
  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    window.removeEventListener('resize', this.updateVisual);
  }


  private updateElements() {
    if (!this.slider || this.items.length == 0) {
      return;
    }
    this.items.forEach(el => this.slider.append(el));
    this.items = [];

    this.slider.resize();
  }

}
