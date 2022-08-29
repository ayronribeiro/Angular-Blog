import { Component, OnInit, ElementRef, Optional, Host, AfterContentInit, Input } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements AfterContentInit {

  @Input() title: string;

  constructor(public element: ElementRef, @Optional() @Host() private parent?: TabsComponent) {

  }

  ngAfterContentInit(): void {
    if (!this.parent) {
      return;
    }

    this.parent.append(this);
  }
  ngOnDestroy() {
    if (this.parent) {
      this.parent.remove(this);
    }
  }

}
