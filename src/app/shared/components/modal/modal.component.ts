import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayComponent } from '../overlay/overlay.component';

class SideBarChange {
  constructor(private search: string, private page: number){

  }
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


  @Input() hash = null;
  @Input() loader = false;

  @Input('canClose') canClose = true;


  @Output('open') $open = new EventEmitter();
  @Output('close') $close = new EventEmitter();

  @ViewChild('overlay') overlay: OverlayComponent;

  close(){
    this.router.navigate([], {fragment: null, replaceUrl: true })
  }

  open(){
    this.router.navigate([], {fragment: this.hash })
 }


  constructor(private router: Router) { }

  ngOnInit(): void {
  }



}
