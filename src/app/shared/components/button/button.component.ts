import { Component, OnInit, Input, Host, Optional } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() type = 'button';
  @Input() icon = null;
  @Input() disabled = false;
  @Input() design = 'basic';
  @Input() loader = false;


  constructor( @Optional() @Host() public form: FormComponent) {}

  ngOnInit() {
  }

}
