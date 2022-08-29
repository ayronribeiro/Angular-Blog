import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {


  constructor(private elt: ElementRef) {

  }

  ngOnInit(): void {
  }


}
