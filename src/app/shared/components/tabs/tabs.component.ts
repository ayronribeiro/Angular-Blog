import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { CarouselDirective } from '../../directives/carousel.directive';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @ViewChild(CarouselDirective, { static: true }) carousel;

  tabs: TabComponent[] = [];

  constructor() { }



  ngOnInit() {
  }



  public append(tab: TabComponent) {
    const index = this.tabs.indexOf(tab);
    if (index < 0) {
      this.tabs.push(tab);
      this.carousel.append(tab.element.nativeElement);
    }
  }

  remove(tab: TabComponent) {
    const index = this.tabs.indexOf(tab);
    if (index > -1) {
      this.tabs.splice(index, 1);
      this.carousel.remove(tab.element.nativeElement);
    }
  }

  select(index: number){
    this.carousel.select(index);
  }

  get selectedIndex(){
    return this.carousel.selectedIndex;
  }
}

